from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.unified_ai import UnifiedAIRequest, UnifiedAIResponse
from app.ai.unified_service import UnifiedAIService


router = APIRouter(
    prefix="/ai",
    tags=["Unified AI"],
)


@router.post(
    "/unified-analyze",
    response_model=UnifiedAIResponse,
    status_code=status.HTTP_200_OK,
)
def unified_analyze(
    request: UnifiedAIRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = UnifiedAIService()

    try:
        return service.analyze(
            question=request.question,
            dataset_id=request.dataset_id,
            document_id=request.document_id,
            current_user=current_user,
            db=db,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc