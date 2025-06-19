import enum
from typing import List
from sqlmodel import Column, Enum, ForeignKey, Relationship, SQLModel, Field, String
from uuid import UUID, uuid4
from datetime import datetime


from models.projects_account_link import ProjectJoinedAccounts
from models.project_user_link import ProjectJoinedUsers


class ProjectBase(SQLModel):
    description: str | None = Field(
        default=None, max_length=500, nullable=True)
    name: str = Field(index=True, unique=True, max_length=100)


class ProjectStatusEnum(enum.Enum):
    new = "new"
    in_progress = "in_progress"
    completed = "completed"


class CreateProject(ProjectBase):
    pass


class UpdateProject(SQLModel):
    description: str | None = Field(
        default=None, max_length=500, nullable=True)
    status: str = Field(foreign_key="projectstatus.name", default="new")


class ProjectStatus(SQLModel, table=True):
    __tablename__ = "projectstatus"

    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    name: str = Field(unique=True, max_length=100)


class Projects(ProjectBase, table=True):
    __tablename__ = "projects"

    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    status: ProjectStatusEnum = Field(
        sa_column=Column(Enum(ProjectStatusEnum),
                         ForeignKey("projectstatus.name")),
        default=ProjectStatusEnum.new
    )
    joined_users: List["Users"] = Relationship(
        back_populates="joined_projects", link_model=ProjectJoinedUsers)

    joined_accounts: List["Accounts"] = Relationship(
        back_populates="joined_accounts", link_model=ProjectJoinedAccounts)

    create_at: datetime = Field(default_factory=datetime.now, nullable=False)
    update_at: datetime = Field(default_factory=datetime.now, nullable=False)
