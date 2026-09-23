from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

app = FastAPI(
    title="EngiSense AI API",
    description="Engineering Intelligence Platform API",
    version="0.1.0",
)


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