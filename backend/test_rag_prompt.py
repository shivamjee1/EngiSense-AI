from app.database.session import SessionLocal
from app.documents.context_builder import build_rag_context
from app.documents.retriever import DocumentRetriever
from app.llm.prompt import build_rag_prompt


db = SessionLocal()

try:
    retriever = DocumentRetriever()

    question = "What are the main phases of EngiSense AI?"

    chunks = retriever.retrieve(
        question,
        db,
        top_k=5,
        document_id=1,
    )

    context = build_rag_context(chunks)

    prompt = build_rag_prompt(
        question=question,
        context=context,
    )

    print("RAG prompt construction successful")
    print("Retrieved chunks:", len(chunks))
    print("Prompt characters:", len(prompt))

    print("\n--- RAG PROMPT ---\n")
    print(prompt)

finally:
    db.close()