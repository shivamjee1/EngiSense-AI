from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.api.auth import router as auth_router
from app.api.analysis import router as analysis_router

from app.database.dependencies import get_db

app = FastAPI(
    title="EngiSense AI API",
    description="Engineering Intelligence Platform API",
    version="0.1.0",
)

app.include_router(auth_router)
app.include_router(analysis_router)

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