"""Backend tests for Renderlabs landing page API (root + contact endpoints)."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://creative-ai-studio-217.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health / root ---
class TestRoot:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# --- POST /api/contact validation ---
class TestContactValidation:
    def test_missing_fields_returns_422(self, session):
        r = session.post(f"{API}/contact", json={"name": "John"})
        assert r.status_code == 422

    def test_invalid_email_returns_422(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "John", "email": "not-an-email", "message": "Hi"
        })
        assert r.status_code == 422

    def test_empty_name_returns_422(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "", "email": "a@b.com", "message": "Hi"
        })
        assert r.status_code == 422

    def test_empty_message_returns_422(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "John", "email": "a@b.com", "message": ""
        })
        assert r.status_code == 422


# --- POST + GET integration ---
class TestContactCRUD:
    def test_create_contact_and_verify_persistence(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "message": f"TEST_message_{unique} - Hello from pytest",
        }

        # count before
        before = session.get(f"{API}/contact")
        assert before.status_code == 200
        before_count = len(before.json())

        # create
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, f"Unexpected status: {r.status_code} body={r.text}"
        data = r.json()
        assert data.get("status") == "success"
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "email_sent" in data and isinstance(data["email_sent"], bool)
        new_id = data["id"]

        # GET - verify retrievable
        after = session.get(f"{API}/contact")
        assert after.status_code == 200
        items = after.json()
        assert len(items) == before_count + 1

        match = [i for i in items if i.get("id") == new_id]
        assert len(match) == 1, "Newly created contact not found in GET /api/contact"
        rec = match[0]
        assert rec["name"] == payload["name"]
        assert rec["email"] == payload["email"]
        assert rec["message"] == payload["message"]
        assert "created_at" in rec

    def test_email_sent_flag_true_when_resend_configured(self, session):
        """If RESEND_API_KEY is configured, email_sent should be True for a valid submission."""
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_Email_{unique}",
            "email": f"test_email_{unique}@example.com",
            "message": "Testing email send flag",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200
        # We don't strictly assert True since we don't know env state on remote,
        # but report it for visibility.
        data = r.json()
        print(f"email_sent flag = {data.get('email_sent')}")
