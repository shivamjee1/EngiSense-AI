from huggingface_hub import InferenceClient

from app.core.config import settings
from app.llm.service import LLMService


class HuggingFaceAPIService(LLMService):
    def __init__(self):
        if not settings.HF_TOKEN:
            raise ValueError("HF_TOKEN is not configured")

        self.client = InferenceClient(
            api_key=settings.HF_TOKEN,
            provider="auto",
        )

        self.model = settings.LLM_MODEL

    def generate(self, prompt: str) -> str:
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty")

        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.1,
            max_tokens=512,
        )

        answer = completion.choices[0].message.content

        if not answer or not answer.strip():
            raise ValueError("LLM returned an empty response")

        return answer.strip()