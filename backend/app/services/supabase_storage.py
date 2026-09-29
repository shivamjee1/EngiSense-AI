from tempfile import NamedTemporaryFile

from supabase import create_client

from app.core.config import settings


supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SECRET_KEY,
)


def upload_document(
    file_name: str,
    file_content: bytes,
    content_type: str,
) -> str:
    storage_path = f"documents/{file_name}"

    supabase.storage.from_(
        settings.SUPABASE_STORAGE_BUCKET
    ).upload(
        path=storage_path,
        file=file_content,
        file_options={
            "content-type": content_type,
            "upsert": "false",
        },
    )

    return storage_path


def download_document_to_temp(
    storage_path: str,
    suffix: str,
) -> str:
    file_content = (
        supabase.storage
        .from_(settings.SUPABASE_STORAGE_BUCKET)
        .download(storage_path)
    )

    temp_file = NamedTemporaryFile(
        delete=False,
        suffix=suffix,
    )

    temp_file.write(file_content)
    temp_file.close()

    return temp_file.name


def delete_document(
    storage_path: str,
) -> None:
    (
        supabase.storage
        .from_(settings.SUPABASE_STORAGE_BUCKET)
        .remove([storage_path])
    )