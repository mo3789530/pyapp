

from functools import partial
from fastapi import APIRouter, Depends, HTTPException

from core.security import get_current_user
from models.request import CreateRequest, RequestSSOUserCreate, RequestAdminCreate
from routers.deps import SessionDep
from uuid import UUID


router = APIRouter(prefix="/request", tags=["req"])


@router.post("/")
async def create_request(request: CreateRequest, session: SessionDep,
                         current_user=Depends(
                             partial(get_current_user, action="create"))
                         ):
    print(request.item.model_dump_json())
    match request.item:
        case RequestSSOUserCreate():
            print("SSO ------")
            print(request.item.model_dump_json())
        case RequestAdminCreate():
            print("Admin----")
            print(request.item.model_dump_json())
        case _:
            print("error")
            # if isinstance(request.item, RequestSSOUserCreate):
            #     print("SSO")
            # else:
            #     print(request.item.__name__)
    return request.model_dump_json()
