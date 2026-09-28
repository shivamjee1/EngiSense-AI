from sqlalchemy.orm import Session

from app.ai.analysis_service import AIAnalysisService
from app.documents.rag_service import RAGService
from app.llm.huggingface_api_service import HuggingFaceAPIService
from app.models.user import User


class UnifiedAIService:
    def __init__(self):
        self.ai_analysis = AIAnalysisService()
        self.rag_service = RAGService()
        self.llm = HuggingFaceAPIService()

    def analyze(
        self,
        question: str,
        dataset_id: int,
        document_id: int,
        current_user: User,
        db: Session,
    ) -> dict:

        if not question or not question.strip():
            raise ValueError("Question cannot be empty")

        # 1. Run deterministic dataset analysis.
        dataset_analysis = self.ai_analysis.analyze(
            question=question,
            dataset_id=dataset_id,
            user_id=current_user.id,
            db=db,
        )

        # 2. Retrieve document evidence without generating
        # an intermediate LLM answer.
        document_context = self.rag_service.retrieve_context(
            question=question,
            document_id=document_id,
            current_user=current_user,
            db=db,
        )

        # 3. Combine both evidence sources.
        prompt = self._build_prompt(
            question=question,
            dataset_analysis=dataset_analysis,
            document_context=document_context,
        )

        # 4. Generate ONE final answer.
        answer = self.llm.generate(prompt)

        return {
            "question": question,
            "dataset_id": dataset_id,
            "document_id": document_id,
            "tool_used": dataset_analysis["tool_used"],
            "dataset_result": dataset_analysis["result"],
            "answer": answer,
        }

    @staticmethod
    def _build_prompt(
        question: str,
        dataset_analysis: dict,
        document_context: str,
    ) -> str:

        return f"""
You are EngiSense AI, an engineering intelligence assistant.

Answer the user's question using ONLY the supplied evidence.

There are two evidence sources:

1. Engineering document context
2. Deterministic dataset analysis

IMPORTANT RULES:

- Do not invent engineering values.
- Do not invent information not present in the evidence.
- Do not perform new numerical calculations.
- Treat the dataset analysis as authoritative for calculated values.
- Treat the document context as authoritative for documented information.
- Distinguish statistical outlier bounds from engineering safety limits.
- Never call a statistical IQR boundary an engineering operating limit
  unless the document explicitly defines it as one.
- If the evidence is insufficient, explicitly state that.

Engineering document context:
----------------
{document_context}
----------------

Dataset analysis:
----------------
Tool used:
{dataset_analysis["tool_used"]}

Result:
{dataset_analysis["result"]}
----------------

User question:
{question}

Provide a concise engineering explanation based only on the evidence.
"""