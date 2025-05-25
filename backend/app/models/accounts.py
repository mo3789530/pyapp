from typing import List
from sqlmodel import Relationship, SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

from models.projects_account_link import ProjectJoinedAccounts


class AccountsBase(SQLModel):
    email: str = Field(index=True, unique=True, max_length=100)
    name: str = Field(index=True, unique=True, max_length=100)
    is_deleted: bool = Field(default=False)

class Accounts(AccountsBase, table=True):
    __tablename__ = "accounts"

    account_id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)

    joined_projects: List["Projects"] = Relationship(
        back_populates="joined_accounts", link_model=ProjectJoinedAccounts)
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    deleted_at: datetime | None = Field(default=None, nullable=True)
