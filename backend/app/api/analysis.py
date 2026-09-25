from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.analysis.pipeline import analyze_csv

router = APIRouter(
    prefix="/analysis",
    tags=["Engineering Analysis"],
)


@router.get("/thermal-test")
def analyze_thermal_test():
    project_root = Path(__file__).resolve().parents[3]
    file_path = project_root / "data" / "thermal_test.csv"

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Thermal test dataset not found",
        )

    try:
        result = analyze_csv(str(file_path))
        return result

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )