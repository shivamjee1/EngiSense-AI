import uuid

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_register_user():
    email = f"test_{uuid.uuid4().hex[:8]}@engisense.ai"

    response = client.post(
        "/auth/register",
        json={
            "email": email,
            "password": "TestPassword123!",
        },
    )

    assert response.status_code in (200, 201)
    data = response.json()

    assert "id" in data or "user" in data


def test_login_user():
    email = f"login_{uuid.uuid4().hex[:8]}@engisense.ai"
    password = "TestPassword123!"

    register_response = client.post(
        "/auth/register",
        json={
            "email": email,
            "password": password,
        },
    )

    assert register_response.status_code in (200, 201)

    login_response = client.post(
        "/auth/login",
        json={
            "email": email,
            "password": password,
        },
    )

    assert login_response.status_code == 200

    data = login_response.json()

    assert "access_token" in data


def test_protected_endpoint_without_token():
    response = client.get("/auth/me")

    assert response.status_code in (401, 403)