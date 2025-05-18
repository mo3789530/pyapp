from fastapi import APIRouter, Depends, HTTPException

from curd.projects import get_list_project_statuses
from routers.deps import SessionDep


router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/status-list")
def get_projects_status_lists(session: SessionDep):
    return get_list_project_statuses(session)

