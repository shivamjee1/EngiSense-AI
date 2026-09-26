from app.documents.context_builder import build_rag_context
from app.documents.retriever import DocumentRetriever
from app.database.session import SessionLocal


db = SessionLocal()

try:
    retriever = DocumentRetriever()

    chunks = retriever.retrieve(
        "What is the development roadmap for EngiSense AI?",
        db,
        top_k=5,
        document_id=1,
    )

    context = build_rag_context(chunks)

    print("Context building successful")
    print("Retrieved chunks:", len(chunks))
    print("Context characters:", len(context))
    print("\n--- RAG CONTEXT ---\n")
    print(context)

finally:
    db.close()