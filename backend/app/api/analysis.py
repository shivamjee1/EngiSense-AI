from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.analysis.pipeline import analyze_csv
from app.analysis.visualization_service import generate_engineering_charts

from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.analysis_result import AnalysisResult
from app.models.dataset import Dataset
from app.models.user import User
from app.services.dataset_service import get_user_dataset
from app.models.analysis_result import AnalysisResult


router = APIRouter(
    prefix="/analysis",
    tags=["Engineering Analysis"],
)



@router.post("/{dataset_id}")
def analyze_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dataset = get_user_dataset(
        dataset_id=dataset_id,
        user_id=current_user.id,
        db=db,
    )

    # Generate a unique identifier for this
    # analysis run.
    analysis_run_id = uuid4().hex

    project_root = Path(
        __file__
    ).resolve().parents[2]

    chart_directory = (
        project_root
        / "data"
        / "charts"
        / analysis_run_id
    )

    chart_url_prefix = (
        f"/charts/{analysis_run_id}"
    )

    try:
        result = analyze_csv(
            file_path=dataset.file_path,
            chart_directory=str(
                chart_directory
            ),
            chart_url_prefix=chart_url_prefix,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    analysis_result = AnalysisResult(
        dataset_id=dataset.id,
        result=result,
    )

    db.add(analysis_result)
    db.commit()
    db.refresh(analysis_result)

    return {
        "message": "Dataset analyzed successfully",
        "analysis_id": analysis_result.id,
        "dataset_id": dataset.id,
        "dataset_name": dataset.name,
        "analysis": result,
        "created_at": analysis_result.created_at,
    }


@router.get("/{dataset_id}/results")
def get_analysis_results(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dataset = get_user_dataset(
        dataset_id=dataset_id,
        user_id=current_user.id,
        db=db,
    )

    results = (
        db.query(AnalysisResult)
        .filter(
            AnalysisResult.dataset_id == dataset.id
        )
        .order_by(AnalysisResult.created_at.desc())
        .all()
    )

    return {
        "dataset_id": dataset.id,
        "dataset_name": dataset.name,
        "results": [
            {
                "analysis_id": result.id,
                "result": result.result,
                "created_at": result.created_at,
            }
            for result in results
        ],
    }


@router.get("/{dataset_id}/results/{analysis_id}")
def get_analysis_result(
    dataset_id: int,
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dataset = get_user_dataset(
        dataset_id=dataset_id,
        user_id=current_user.id,
        db=db,
    )

    analysis_result = (
        db.query(AnalysisResult)
        .filter(
            AnalysisResult.id == analysis_id,
            AnalysisResult.dataset_id == dataset.id,
        )
        .first()
    )

    if analysis_result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis result not found",
        )

    return {
        "analysis_id": analysis_result.id,
        "dataset_id": dataset.id,
        "dataset_name": dataset.name,
        "result": analysis_result.result,
        "created_at": analysis_result.created_at,
    }


@router.get("/{dataset_id}/charts")
def get_dataset_charts(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dataset = get_user_dataset(
        dataset_id=dataset_id,
        user_id=current_user.id,
        db=db,
    )

    try:
        charts = generate_engineering_charts(
            dataset.file_path
        )
    except (KeyError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )

    return {
        "dataset_id": dataset.id,
        "dataset_name": dataset.name,
        "charts": {
            "temperature": "/charts/temperature_trend.png",
            "current": "/charts/current_trend.png",
            "voltage": "/charts/voltage_trend.png",
            "correlation_heatmap": "/charts/correlation_heatmap.png",
        },
    }