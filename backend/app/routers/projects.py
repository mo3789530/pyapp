from fastapi import APIRouter, Depends, HTTPException

from curd.projects import get_list_project_statuses, get_list_projects
from routers.deps import SessionDep


router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/status-list")
def get_projects_status_lists(session: SessionDep):
    return get_list_project_statuses(session)


@router.get("/")
def get_projects(session: SessionDep):
    return get_list_projects(session)
