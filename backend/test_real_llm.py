from app.llm.huggingface_api_service import HuggingFaceAPIService


llm = HuggingFaceAPIService()

prompt = """
You are a test assistant.

Answer this question in one short sentence:

What is the purpose of EngiSense AI?
"""

response = llm.generate(prompt)

print("Real LLM generation successful")
print("\n--- RESPONSE ---\n")
print(response)