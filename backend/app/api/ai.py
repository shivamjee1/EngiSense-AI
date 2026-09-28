from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.ai.analysis_service import AIAnalysisService
from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.ai import (
    AIAnalysisRequest,
    AIAnalysisResponse,
)


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post(
    "/analyze",
    response_model=AIAnalysisResponse,
    status_code=status.HTTP_200_OK,
)
def analyze_dataset(
    request: AIAnalysisRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AIAnalysisService()

    try:
        return service.analyze(
            question=request.question,
            dataset_id=request.dataset_id,
            user_id=current_user.id,
            db=db,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc