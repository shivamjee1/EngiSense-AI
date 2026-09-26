from sqlalchemy.orm import Session

from app.documents.embeddings import EmbeddingService
from app.models.document_chunk import DocumentChunk


class DocumentRetriever:
    def __init__(self):
        self.embedding_service = EmbeddingService()

    def retrieve(
        self,
        query: str,
        db: Session,
        top_k: int = 5,
        document_id: int | None = None,
    ) -> list[DocumentChunk]:
        if not query or not query.strip():
            raise ValueError("Query cannot be empty")

        if top_k <= 0:
            raise ValueError("top_k must be greater than 0")

        query_embedding = self.embedding_service.generate_embedding(query)

        query = db.query(DocumentChunk)

        if document_id is not None:
            query = query.filter(
                DocumentChunk.document_id == document_id
            )

        results = (
            query
            .order_by(
                DocumentChunk.embedding.cosine_distance(query_embedding)
            )
            .limit(top_k)
            .all()
        )

        return results