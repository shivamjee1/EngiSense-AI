from typing import Any

from sqlalchemy.orm import Session

from app.ai.dataset_loader import AIDatasetLoader
from app.ai.registry import get_tool
from app.models.dataset import Dataset


class AIToolService:

    def execute_tool(
        self,
        tool_name: str,
        dataset_id: int,
        user_id: int,
        db: Session,
    ) -> dict[str, Any]:

        dataset = (
            db.query(Dataset)
            .filter(
                Dataset.id == dataset_id,
                Dataset.owner_id == user_id,
            )
            .first()
        )

        if dataset is None:
            raise ValueError(
                "Dataset not found"
            )

        tool = get_tool(tool_name)

        df = AIDatasetLoader.load(dataset)

        result = tool.execute(df=df)

        return {
            "tool_name": tool.name,
            "dataset_id": dataset.id,
            "success": True,
            "result": result,
        }