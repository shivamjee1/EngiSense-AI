from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.dataset import Dataset


def get_user_dataset(
    dataset_id: int,
    user_id: int,
    db: Session,
) -> Dataset:
    dataset = (
        db.query(Dataset)
        .filter(
            Dataset.id == dataset_id,
            Dataset.owner_id == user_id,
        )
        .first()
    )

    if dataset is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found",
        )

    return dataset