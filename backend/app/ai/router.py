import json

from app.llm.huggingface_api_service import HuggingFaceAPIService


class AIToolRouter:
    def __init__(self):
        self.llm = HuggingFaceAPIService()

    def select_tool(self, question: str) -> str:
        if not question or not question.strip():
            raise ValueError("Question cannot be empty")

        prompt = f"""
You are the tool-selection router for EngiSense AI.

Choose exactly ONE tool from the following list.

Available tools:

1. dataset_summary
   - Dataset structure, rows, columns, column names, general summary.

2. statistics
   - Descriptive statistics such as mean, standard deviation,
     minimum, maximum, quartiles.

3. correlation
   - Relationships and correlation between numeric engineering parameters.

4. outlier_detection
   - Detect statistically abnormal values using the IQR method.

Return ONLY valid JSON in this exact format:

{{
    "tool": "tool_name"
}}

Do not explain your choice.
Do not return markdown.
Do not return any other fields.

User question:
{question}
"""

        response = self.llm.generate(prompt)

        try:
            parsed = json.loads(response)
        except json.JSONDecodeError as exc:
            raise ValueError(
                "LLM returned invalid tool-selection JSON"
            ) from exc

        tool_name = parsed.get("tool")

        allowed_tools = {
            "dataset_summary",
            "statistics",
            "correlation",
            "outlier_detection",
        }

        if tool_name not in allowed_tools:
            raise ValueError(
                f"LLM selected an unsupported tool: {tool_name}"
            )

        return tool_name