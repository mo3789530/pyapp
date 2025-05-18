from sqlmodel import SQLModel, Field, Sequence, Session, select
from uuid import UUID, uuid4
from datetime import datetime
from models.projects import ProjectStatus


def get_list_project_statuses(session: Session) -> Sequence[ProjectStatus]:
    return session.exec(select(ProjectStatus)).all()

