from fastapi import APIRouter, Depends, HTTPException

from curd.project_user import get_linked_projects_user, link_project_user
from models.projects import CreateProject, UpdateProject
from curd.projects import (get_list_project_statuses, get_list_projects, update_project as crud_update_project,
                           create_project as crud_create_project, get_project_joined_users as crud_get_project_joined_users)
from routers.deps import SessionDep
from uuid import UUID


router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/status-list")
def get_projects_status_lists(session: SessionDep):
    return get_list_project_statuses(session)


@router.get("/")
def get_projects(session: SessionDep):
    return get_list_projects(session)


@router.put("/{id}")
def update_project(session: SessionDep, id: str, update: UpdateProject):
    project_id = UUID(id)
    updated_project = crud_update_project(session, update, project_id)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project


@router.post("/")
def create_project(session: SessionDep, project: CreateProject):
    return crud_create_project(session, project)


@router.post("/{id}/join/user/{user_id}")
def join_project(session: SessionDep, id: str, user_id: str):
    project_id, user_id = UUID(id), UUID(user_id)

    exist = get_linked_projects_user(session, project_id, user_id)
    if exist:
        raise HTTPException(status_code=400, detail="Already joined")
    else:
        return link_project_user(session, project_id, user_id)


@router.get("/{id}/users")
def get_project_joined_users(session: SessionDep, id: str):
    project_id = UUID(id)
    return crud_get_project_joined_users(session, project_id)
