from app.llm.huggingface_service import HuggingFaceLLMService


llm = HuggingFaceLLMService()

response = llm.generate(
    "Answer briefly: What is an engineering dataset?"
)

print("LLM generation successful")
print("\nResponse:")
print(response)