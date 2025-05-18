from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime


class UsersBase(SQLModel):
    email: str = Field(index=True, unique=True, max_length=100)
    name: str = Field(index=True, unique=True, max_length=100)
    is_deleted: bool = Field(default=False)


class Users(UsersBase, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)

    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    deleted_at: datetime | None = Field(default=None, nullable=True)
