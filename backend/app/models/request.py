import enum
from typing import List, Union
from pydantic import ConfigDict
from sqlmodel import Column, Enum, ForeignKey, Relationship, SQLModel, Field, String
from uuid import UUID, uuid4
from datetime import datetime
from typing import Union


RequestItem = Union["RequestSSOUserCreate", "RequestAdminCreate"]


class Request(SQLModel, table=False):
    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    type: str = Field()
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)


class RequestSSOUserCreate(SQLModel, table=False):
    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    request_id: UUID = Field(foreign_key="request.id")
    sso_user_id: UUID = Field()
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)


class RequestAdminCreate(SQLModel):
    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    request_id: UUID = Field(foreign_key="request.id")
    user_id: UUID = Field()


class CreateRequest(SQLModel):
    request: Request
    item: RequestItem
