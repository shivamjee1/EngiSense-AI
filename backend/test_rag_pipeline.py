from app.database.session import SessionLocal
from app.documents.context_builder import build_rag_context
from app.documents.retriever import DocumentRetriever
from app.llm.mock_service import MockLLMService
from app.llm.prompt import build_rag_prompt


db = SessionLocal()

try:
    question = "What are the main phases of EngiSense AI?"

    # 1. Retrieve relevant document chunks
    retriever = DocumentRetriever()

    chunks = retriever.retrieve(
        question,
        db,
        top_k=5,
        document_id=1,
    )

    # 2. Build RAG context
    context = build_rag_context(chunks)

    # 3. Build final prompt
    prompt = build_rag_prompt(
        question=question,
        context=context,
    )

    # 4. Send prompt to LLM layer
    llm = MockLLMService()
    response = llm.generate(prompt)

    print("RAG pipeline successful")
    print(f"Retrieved chunks: {len(chunks)}")
    print(f"Context characters: {len(context)}")
    print(f"Prompt characters: {len(prompt)}")

    print("\n--- RESPONSE ---\n")
    print(response)

finally:
    db.close()