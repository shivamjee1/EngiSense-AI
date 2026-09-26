from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.documents.rag_service import RAGService
from app.models.user import User
from app.schemas.rag import RAGAnswer, RAGQuestion


router = APIRouter(
    prefix="/rag",
    tags=["RAG"],
)


@router.post(
    "/ask",
    response_model=RAGAnswer,
)
def ask_question(
    payload: RAGQuestion,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rag_service = RAGService()

    try:
        answer = rag_service.answer_question(
            question=payload.question,
            document_id=payload.document_id,
            current_user=current_user,
            db=db,
        )

        return RAGAnswer(
            document_id=payload.document_id,
            question=payload.question,
            answer=answer,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )