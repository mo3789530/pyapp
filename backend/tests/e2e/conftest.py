from typing import Generator
from fastapi.testclient import TestClient
import pytest
from unittest.mock import patch
import sys 
import os


sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../app")))
print(sys.path)

@pytest.fixture(scope="session", autouse=True)
def mock_settings():
    import app.core.config
    with patch.object(app.core.config, "get_secret", return_value="test_password"):
        yield


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    from app.app import app
    with TestClient(app=app) as c:
        yield c