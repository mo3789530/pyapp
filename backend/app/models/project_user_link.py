from sqlmodel import SQLModel, Field, String
from uuid import UUID, uuid4


class ProjectJoinedUsers(SQLModel, table=True):
    __tablename__ = "projectjoinedssousers"

    project_id: UUID = Field(foreign_key="projects.id", primary_key=True)
    user_id: UUID = Field(foreign_key="sso_users.id", primary_key=True)
