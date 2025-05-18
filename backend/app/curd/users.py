from typing import Optional
from sqlmodel import SQLModel, Field, Sequence, Session, select
from uuid import UUID, uuid4
from datetime import datetime
from models.users import Users


def get_list_users(session: Session) -> Sequence[Users]:
    return session.exec(select(Users)).all()  # type: ignore


def create_user(session: Session, user: Users) -> Users:
    db_user = Users.model_validate(user)
    session.add(db_user)
    session.commit
    return db_user
