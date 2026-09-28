from app.ai.tool_service import AIToolService
from app.database.session import SessionLocal
from app.models.dataset import Dataset


db = SessionLocal()

try:
    dataset = (
        db.query(Dataset)
        .first()
    )

    if dataset is None:
        raise RuntimeError(
            "No dataset found in database. "
            "Upload a dataset first."
        )

    service = AIToolService()

    result = service.execute_tool(
        tool_name="dataset_summary",
        dataset_id=dataset.id,
        user_id=dataset.owner_id,
        db=db,
    )

    print("\nAI TOOL SERVICE RESULT")
    print("======================")
    print(result)

finally:
    db.close()