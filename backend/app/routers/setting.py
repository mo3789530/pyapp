
from typing import Annotated
from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings

router = APIRouter()


@router.get("/api/settings")
async def login(settings: Annotated[Settings, Depends(get_settings)]) -> dict:
    return {"DB": settings.POSTGRES_PASSWORD}
