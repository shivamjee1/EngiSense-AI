from pydantic import BaseModel


class RAGQuestion(BaseModel):
    document_id: int
    question: str


class RAGAnswer(BaseModel):
    document_id: int
    question: str
    answer: str