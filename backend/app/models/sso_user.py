from typing import List
from sqlmodel import Relationship, SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

from models.project_user_link import ProjectJoinedUsers


class SSOUsersBase(SQLModel):
    email: str = Field(index=True, unique=True, max_length=100)
    name: str = Field(index=True, unique=True, max_length=100)
    is_deleted: bool = Field(default=False)


class SSOUsers(SSOUsersBase, table=True):
    __tablename__ = "sso_users"

    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    user_id: UUID = Field(default_factory=uuid4,
                          unique=True, foreign_key="users.id")

    joined_projects: List["Projects"] = Relationship(
        back_populates="joined_users", link_model=ProjectJoinedUsers)
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    deleted_at: datetime | None = Field(default=None, nullable=True)
