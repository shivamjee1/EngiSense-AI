from sqlalchemy.orm import Session

from app.documents.chunker import chunk_document_text
from app.documents.embeddings import EmbeddingService
from app.documents.extractor import extract_document_text
from app.models.document import Document
from app.models.document_chunk import DocumentChunk


def process_document(document: Document, db: Session) -> int:
    text = extract_document_text(
        document.file_path,
        document.file_type,
    )

    chunks = chunk_document_text(text)

    embedding_service = EmbeddingService()
    embeddings = embedding_service.generate_embeddings(chunks)

    # Remove previously generated chunks for this document.
    db.query(DocumentChunk).filter(
        DocumentChunk.document_id == document.id
    ).delete(
        synchronize_session=False
    )

    document_chunks = []

    for index, (chunk, embedding) in enumerate(
        zip(chunks, embeddings)
    ):
        document_chunk = DocumentChunk(
            document_id=document.id,
            chunk_index=index,
            content=chunk,
            embedding=embedding,
        )

        document_chunks.append(document_chunk)

    db.add_all(document_chunks)
    db.commit()

    return len(document_chunks)