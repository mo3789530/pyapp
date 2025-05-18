from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class ProjectBase(SQLModel):
    description: str | None = Field(default=None, max_length=500, nullable=True)
    name: str = Field(index=True, unique=True, max_length=100)
    

class Projects(ProjectBase, table=True):
    __tablename__ = "projects"

    id: UUID = Field(default=uuid4, primary_key=True, unique=True)
    status: str = Field(foreign_key="projectstatus.name", default="new")
    
    create_at: datetime = Field(default_factory=datetime.now, nullable=False)
    update_at: datetime = Field(default_factory=datetime.now, nullable=False)



class ProjectStatus(SQLModel, table=True):
    __tablename__ = "projectstatus"

    id: UUID = Field(default=uuid4, primary_key=True, unique=True)
    name: str = Field(unique=True, max_length=100)
    

class ProjectJoinedUsers(SQLModel, table=True):
    __tablename__ = "projectjoinedusers"

    project_id: UUID = Field(foreign_key="projects.id", primary_key=True)
    user_id: UUID = Field(foreign_key="users.id", primary_key=True)
