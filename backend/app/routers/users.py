from fastapi import APIRouter, Depends, HTTPException

from curd.users import get_list_users
from routers.deps import SessionDep
from uuid import UUID


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
def get_users(session: SessionDep):
    return get_list_users(session)
