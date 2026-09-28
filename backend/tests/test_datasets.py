import uuid

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def create_test_user():
    email = f"dataset_{uuid.uuid4().hex[:8]}@engisense.ai"
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


def test_dataset_list_requires_authentication():
    response = client.get("/datasets/")

    assert response.status_code in (401, 403)


def test_dataset_list_authenticated():
    token = create_test_user()

    response = client.get(
        "/datasets/",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "datasets" in data
    assert isinstance(data["datasets"], list)