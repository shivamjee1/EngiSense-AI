from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.document import Document
from app.models.user import User
from app.documents.processor import process_document
from app.services.document_storage import (
    save_document_file,
)


router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
}


@router.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is required",
        )

    file_extension = Path(
        file.filename
    ).suffix.lower()

    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and DOCX files are supported",
        )

    file_content = await file.read()

    if not file_content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty",
        )

    stored_path = save_document_file(
        file.filename,
        file_content,
    )

    document = Document(
        name=file.filename,
        file_path=stored_path,
        file_type=file_extension.lstrip("."),
        owner_id=current_user.id,
    )

    db.add(document)
    db.commit()
    db.refresh(document)
    
    process_document(document, db)

    return {
        "message": "Document uploaded successfully",
        "document": {
            "id": document.id,
            "name": document.name,
            "file_type": document.file_type,
            "owner_id": document.owner_id,
            "created_at": document.created_at,
        },
    }

@router.get("/")
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    documents = (
        db.query(Document)
        .filter(
            Document.owner_id == current_user.id
        )
        .order_by(Document.created_at.desc())
        .all()
    )

    return {
        "documents": [
            {
                "id": document.id,
                "name": document.name,
                "file_type": document.file_type,
                "owner_id": document.owner_id,
                "created_at": document.created_at,
            }
            for document in documents
        ]
    }

@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.owner_id == current_user.id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    file_path = Path(document.file_path)

    if file_path.exists():
        file_path.unlink()

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully",
        "document_id": document_id,
    }