from fastapi.testclient import TestClient



def test_health(client: TestClient, mock_settings) -> None:
    """Test the health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200


def test_settings(client: TestClient, mock_settings) -> None:
    """Test the settings endpoint."""
    response = client.get("/api/settings")
    assert response.status_code == 200
    data = response.json()
    assert "DB" in data
    assert data["DB"] == "test_password"