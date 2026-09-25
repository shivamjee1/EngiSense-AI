from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.api.auth import router as auth_router
from app.api.analysis import router as analysis_router
from app.api.datasets import router as datasets_router

from app.database.dependencies import get_db

from pathlib import Path

from fastapi.staticfiles import StaticFiles

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EngiSense AI API",
    description="Engineering Intelligence Platform API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

project_root = Path(__file__).resolve().parents[1]

charts_directory = project_root / "data" / "charts"
charts_directory.mkdir(parents=True, exist_ok=True)

app.mount(
    "/charts",
    StaticFiles(directory=charts_directory),
    name="charts",
)

app.include_router(auth_router)
app.include_router(analysis_router)
app.include_router(datasets_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to EngiSense AI API",
        "status": "running",
    }


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))

    return {
        "status": "healthy",
        "database": "connected",
    }