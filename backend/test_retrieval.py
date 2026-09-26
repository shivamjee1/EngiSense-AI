from app.documents.retriever import DocumentRetriever
from app.database.session import SessionLocal


db = SessionLocal()

try:
    retriever = DocumentRetriever()

    results = retriever.retrieve(
        "What is the development roadmap for EngiSense AI?",
        db,
        top_k=5,
        document_id=1,
    )

    print("Retrieval successful")
    print("Results:", len(results))

    for result in results:
        print(f"\nChunk {result.chunk_index}:")
        print(result.content[:500])

finally:
    db.close()