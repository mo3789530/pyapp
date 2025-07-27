from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from functools import wraps

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
bearer_scheme = HTTPBearer()


def get_current_user(
        action: str = None,
        credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    token = credentials.credentials
    print(token, action)
    if token == "test":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token
