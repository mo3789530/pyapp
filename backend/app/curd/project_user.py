from typing import Optional
from sqlmodel import SQLModel, Field, Sequence, Session, select
from uuid import UUID, uuid4
from datetime import datetime

from models import User
from models.project_user_link import ProjectJoinedUsers


def get_linked_projects_user(session: Session, project_id: UUID, user_id: UUID) -> Optional[ProjectJoinedUsers]:
    sql = select(ProjectJoinedUsers).where(
        ProjectJoinedUsers.project_id == project_id,
        ProjectJoinedUsers.user_id == user_id
    )
    return session.exec(sql).first()


def link_project_user(session: Session, project_id: UUID, user_id: UUID) -> ProjectJoinedUsers:
    link = ProjectJoinedUsers(project_id=project_id, user_id=user_id)
    session.add(link)
    session.commit()
    return link


def get_project_joined_users(session: Session, id: UUID) -> Sequence[User]:
    pass
