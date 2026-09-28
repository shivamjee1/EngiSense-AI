from app.ai.unified_service import UnifiedAIService
from app.database.session import SessionLocal
from app.models.dataset import Dataset
from app.models.document import Document
from app.models.user import User


db = SessionLocal()

try:
    user = db.query(User).first()

    if user is None:
        raise RuntimeError("No user found")

    dataset = (
        db.query(Dataset)
        .filter(
            Dataset.owner_id == user.id
        )
        .first()
    )

    if dataset is None:
        raise RuntimeError(
            "No dataset found for user"
        )

    document = (
        db.query(Document)
        .filter(
            Document.owner_id == user.id
        )
        .first()
    )

    if document is None:
        raise RuntimeError(
            "No document found for user"
        )

    service = UnifiedAIService()

    question = (
        "Based on the engineering document and my dataset, "
        "explain whether the vibration values are abnormal."
    )

    result = service.analyze(
        question=question,
        dataset_id=dataset.id,
        document_id=document.id,
        current_user=user,
        db=db,
    )

    print("\nUNIFIED AI RESULT")
    print("=================")

    print("\nTool Used:")
    print(result["tool_used"])

    print("\nDataset Result:")
    print(result["dataset_result"])

    print("\nDocument Context:")
    print(result["document_context"])

    print("\nFinal Answer:")
    print(result["answer"])

finally:
    db.close()