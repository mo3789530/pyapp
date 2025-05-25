from sqlmodel import SQLModel, Field, String
from uuid import UUID


class ProjectJoinedAccounts(SQLModel, table=True):
    __tablename__ = "projectjoinedaccount"

    project_id: UUID = Field(foreign_key="projects.id", primary_key=True)
    account_id: UUID = Field(foreign_key="accounts.account_id", primary_key=True)
