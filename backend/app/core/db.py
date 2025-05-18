from sqlmodel import create_engine

from core.config import settings  # Use the global settings instance


engine = create_engine(
    str(settings.SQLALCHEMY_DATABASE_URI), connect_args={"check_same_thread": False}
)
