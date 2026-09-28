from typing import Any

from pydantic import BaseModel, Field


class UnifiedAIRequest(BaseModel):
    dataset_id: int = Field(gt=0)
    document_id: int = Field(gt=0)
    question: str = Field(min_length=1)


class UnifiedAIResponse(BaseModel):
    question: str
    dataset_id: int
    document_id: int
    tool_used: str
    dataset_result: dict[str, Any]
    answer: str