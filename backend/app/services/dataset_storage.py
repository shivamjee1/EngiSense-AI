from pathlib import Path
from uuid import uuid4

UPLOAD_DIR = Path("data/uploads")


def save_dataset_file(filename: str, file_content: bytes) -> str:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    file_extension = Path(filename).suffix.lower()

    unique_filename = f"{uuid4()}{file_extension}"

    file_path = UPLOAD_DIR / unique_filename

    file_path.write_bytes(file_content)

    return str(file_path)