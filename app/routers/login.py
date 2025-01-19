from fastapi import APIRouter

router = APIRouter()


@router.post("/api/")
async def login():
    pass
