import uuid
from pydantic import EmailStr, field_validator
from sqlmodel import SQLModel, Field

# Shared properties


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)

    @field_validator("email")
    def validate_email(cls, v):
        if "@" not in v:
            raise ValueError("Invalid email address")
        return v


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
