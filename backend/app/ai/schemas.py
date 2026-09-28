from typing import Any

from pydantic import BaseModel, Field


class AIToolRequest(BaseModel):
    dataset_id: int = Field(gt=0)


class AIToolResult(BaseModel):
    tool_name: str
    dataset_id: int
    success: bool = True
    result: dict[str, Any]