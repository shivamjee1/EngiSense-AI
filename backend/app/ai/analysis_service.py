from sqlalchemy.orm import Session

from app.ai.router import AIToolRouter
from app.ai.tool_service import AIToolService
from app.llm.huggingface_api_service import HuggingFaceAPIService


class AIAnalysisService:
    def __init__(self):
        self.router = AIToolRouter()
        self.tool_service = AIToolService()
        self.llm = HuggingFaceAPIService()

    def analyze(
        self,
        question: str,
        dataset_id: int,
        user_id: int,
        db: Session,
    ) -> dict:

        if not question or not question.strip():
            raise ValueError("Question cannot be empty")

        # 1. Select the required deterministic tool.
        tool_name = self.router.select_tool(question)

        # 2. Execute the selected tool.
        tool_result = self.tool_service.execute_tool(
            tool_name=tool_name,
            dataset_id=dataset_id,
            user_id=user_id,
            db=db,
        )

        # 3. Ask the LLM to explain the actual result.
        prompt = self._build_explanation_prompt(
            question=question,
            tool_name=tool_name,
            tool_result=tool_result["result"],
        )

        answer = self.llm.generate(prompt)

        return {
            "dataset_id": dataset_id,
            "question": question,
            "tool_used": tool_name,
            "result": tool_result["result"],
            "answer": answer,
        }

    @staticmethod
    def _build_explanation_prompt(
        question: str,
        tool_name: str,
        tool_result: dict,
    ) -> str:

        return f"""
You are EngiSense AI, an engineering data analysis assistant.

Answer the user's question using ONLY the deterministic
analysis result provided below.

The calculation was already performed by an approved
engineering analytics tool.

Do not recalculate numerical values.
Do not invent values.
Do not claim a parameter is abnormal unless the provided
analysis result supports that conclusion.

Explain the result clearly and concisely for an engineering user.

Tool used:
{tool_name}

Analysis result:
{tool_result}

User question:
{question}

Provide the engineering interpretation:
"""