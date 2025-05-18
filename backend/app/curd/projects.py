from typing import Optional
from sqlmodel import SQLModel, Field, Sequence, Session, select
from uuid import UUID, uuid4
from datetime import datetime
from models.projects import CreateProject, ProjectStatus, Projects, UpdateProject


def get_list_project_statuses(session: Session) -> Sequence[ProjectStatus]:
    return session.exec(select(ProjectStatus)).all()  # type: ignore


def get_list_projects(session: Session) -> Sequence[Projects]:
    return session.exec(select(Projects)).all()  # type: ignore


def create_project(session: Session, project: CreateProject) -> Projects:
    db_project = Projects.model_validate(project)
    session.add(db_project)
    session.commit
    session.refresh(db_project)
    return db_project


def update_project(session: Session, update_project: UpdateProject, id: UUID) -> Optional[Projects]:
    db_project = session.get(Projects, id)
    if not db_project:
        return None

    update_data = update_project.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project
