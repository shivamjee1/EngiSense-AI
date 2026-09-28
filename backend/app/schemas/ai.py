from typing import Any

from pydantic import BaseModel, Field


class AIAnalysisRequest(BaseModel):
    dataset_id: int = Field(gt=0)
    question: str = Field(min_length=1)


class AIAnalysisResponse(BaseModel):
    dataset_id: int
    question: str
    tool_used: str
    result: dict[str, Any]
    answer: str