from app.llm.service import LLMService


class MockLLMService(LLMService):
    def generate(self, prompt: str) -> str:
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty")

        return (
            "This is a development response from EngiSense AI. "
            "The question was processed using retrieved document context."
        )