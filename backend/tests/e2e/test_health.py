import pytest
import requests

endpoint = "http://localhost:8000"


def test_health():
    res = requests.get(endpoint+"/api/health")

    assert res.status_code == 200
