import io
import uuid

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def create_test_user():
    email = f"document_{uuid.uuid4().hex[:8]}@engisense.ai"
    password = "TestPassword123!"

    register = client.post(
        "/auth/register",
        json={
            "email": email,
            "password": password,
        },
    )

    assert register.status_code in (200, 201)

    login = client.post(
        "/auth/login",
        json={
            "email": email,
            "password": password,
        },
    )

    assert login.status_code == 200

    return login.json()["access_token"]


def test_document_list_requires_authentication():
    response = client.get("/documents/")

    assert response.status_code in (401, 403)


def test_document_list_authenticated():
    token = create_test_user()

    response = client.get(
        "/documents/",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "documents" in data
    assert isinstance(data["documents"], list)


def test_document_upload_rejects_unsupported_file():
    token = create_test_user()

    response = client.post(
        "/documents/upload",
        headers={
            "Authorization": f"Bearer {token}"
        },
        files={
            "file": (
                "malware.exe",
                io.BytesIO(b"fake executable"),
                "application/octet-stream",
            )
        },
    )

    assert response.status_code == 400


def test_document_upload_rejects_empty_file():
    token = create_test_user()

    response = client.post(
        "/documents/upload",
        headers={
            "Authorization": f"Bearer {token}"
        },
        files={
            "file": (
                "empty.pdf",
                io.BytesIO(b""),
                "application/pdf",
            )
        },
    )

    assert response.status_code == 400