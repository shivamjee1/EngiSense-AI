from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.documents.context_builder import build_rag_context
from app.documents.retriever import DocumentRetriever
from app.llm.mock_service import MockLLMService
from app.llm.prompt import build_rag_prompt
from app.models.document import Document
from app.models.user import User


class RAGService:
    def __init__(self):
        self.retriever = DocumentRetriever()
        self.llm = MockLLMService()

    def answer_question(
        self,
        question: str,
        document_id: int,
        current_user: User,
        db: Session,
    ) -> str:

        if not question or not question.strip():
            raise ValueError("Question cannot be empty")

        document = (
            db.query(Document)
            .filter(
                Document.id == document_id,
                Document.owner_id == current_user.id,
            )
            .first()
        )

        if document is None:
            raise ValueError(
                "Document not found or access denied"
            )

        chunks = self.retriever.retrieve(
            query=question,
            db=db,
            top_k=5,
            document_id=document.id,
        )

        if not chunks:
            raise ValueError(
                "No relevant document content found"
            )

        context = build_rag_context(chunks)

        prompt = build_rag_prompt(
            question=question,
            context=context,
        )

        return self.llm.generate(prompt)