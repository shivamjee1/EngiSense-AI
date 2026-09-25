from pathlib import Path

from docx import Document as DocxDocument
from pypdf import PdfReader


class DocumentExtractionError(ValueError):
    """Raised when document text extraction fails."""


def extract_pdf_text(file_path: str) -> str:
    path = Path(file_path)

    if not path.is_file():
        raise DocumentExtractionError(
            "Document file not found"
        )

    try:
        reader = PdfReader(str(path))

        if reader.is_encrypted:
            raise DocumentExtractionError(
                "Encrypted PDF documents are not supported"
            )

        text_parts = []

        for page in reader.pages:
            page_text = page.extract_text() or ""

            if page_text.strip():
                text_parts.append(page_text.strip())

        extracted_text = "\n\n".join(text_parts).strip()

        if not extracted_text:
            raise DocumentExtractionError(
                "No extractable text found in PDF"
            )

        return extracted_text

    except DocumentExtractionError:
        raise

    except Exception as exc:
        raise DocumentExtractionError(
            f"Failed to extract text from PDF: {exc}"
        ) from exc


def extract_docx_text(file_path: str) -> str:
    path = Path(file_path)

    if not path.is_file():
        raise DocumentExtractionError(
            "Document file not found"
        )

    try:
        document = DocxDocument(str(path))

        paragraphs = [
            paragraph.text.strip()
            for paragraph in document.paragraphs
            if paragraph.text.strip()
        ]

        extracted_text = "\n\n".join(paragraphs).strip()

        if not extracted_text:
            raise DocumentExtractionError(
                "No extractable text found in DOCX"
            )

        return extracted_text

    except DocumentExtractionError:
        raise

    except Exception as exc:
        raise DocumentExtractionError(
            f"Failed to extract text from DOCX: {exc}"
        ) from exc


def extract_document_text(
    file_path: str,
    file_type: str,
) -> str:
    normalized_type = file_type.lower().lstrip(".")

    if normalized_type == "pdf":
        return extract_pdf_text(file_path)

    if normalized_type == "docx":
        return extract_docx_text(file_path)

    raise DocumentExtractionError(
        f"Unsupported document type: {file_type}"
    )