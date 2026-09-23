from fastapi import FastAPI

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
def health_check():
    return {
        "status": "healthy",
    }