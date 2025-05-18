
from typing import Annotated, Generator
from fastapi import Depends
from sqlmodel import Session


def get_db() -> Generator[Session, None, None]:
    from core.db import engine
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]