from pathlib import Path
from uuid import uuid4


DOCUMENT_UPLOAD_DIR = Path("data/documents")


def save_document_file(
    filename: str,
    file_content: bytes,
) -> str:
    DOCUMENT_UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    file_extension = Path(filename).suffix.lower()

    unique_filename = (
        f"{uuid4()}{file_extension}"
    )

    file_path = (
        DOCUMENT_UPLOAD_DIR
        / unique_filename
    )

    file_path.write_bytes(file_content)

    return str(file_path)