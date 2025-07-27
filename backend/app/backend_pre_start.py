from sqlalchemy import Engine
from sqlmodel import SQLModel, Session, select
from core.config import settings


def init(db: Engine):
    try:
        with Session(db) as session:
            session.exec(select(1))
    except Exception as e:
        raise e


def seed(db: Engine) -> None:
    session = Session(db)

    if settings.ENVIRONMENT != "local":  # Corrected: ENVIRONMENT should be all caps
        print("Skipping seeding, not in local environment.")
        return

    print("Starting database seeding for local environment...")
    from models import users, projects

    # Seed ProjectStatus
    # These are the statuses we want to ensure exist in the database.
    project_statuses_to_seed = ["new", "in_progress", "closed"]
    for status_name in project_statuses_to_seed:
        existing_status = session.exec(
            select(projects.ProjectStatus).where(
                projects.ProjectStatus.name == status_name)
        ).first()
        if not existing_status:
            status = projects.ProjectStatus(name=status_name)
            session.add(status)
            print(f"Seeding project status: {status_name}")
        else:
            print(f"Project status '{status_name}' already exists, skipping.")

    user_data_to_seed = [{
        "email": "example@example.com",
        "name": "Example User"
    }]
    existing_user = session.exec(
        select(users.Users).where(
            users.Users.email == user_data_to_seed[0]["email"])
    ).first()

    if not existing_user:
        user_to_seed = users.Users(**user_data_to_seed[0])  # type: ignore
        session.add(user_to_seed)
        print(f"Seeding user: {user_data_to_seed[0]['email']}")
    else:
        print(
            f"User with email '{user_data_to_seed[0]['email']}' already exists, skipping.")

    # Seed Projects
    # Define the project we want to seed.
    project_data_to_seed = {
        "name": "Example Project"
        # The Projects model defaults 'status' to "new".
        # We're ensuring "new" status is created above.
    }
    existing_project = session.exec(
        select(projects.Projects).where(
            projects.Projects.name == project_data_to_seed["name"])
    ).first()
    if not existing_project:
        project_to_seed = projects.Projects(name=project_data_to_seed["name"])
        session.add(project_to_seed)
        print(f"Seeding project: {project_data_to_seed['name']}")
    else:
        print(
            f"Project with name '{project_data_to_seed['name']}' already exists, skipping.")

    session.commit()  # Commit all changes to the database
    print("Database seeding changes committed successfully.")


def create_db_and_tables(engine):
    print("Creating database and tables...")
    from models import users, projects, sso_user, accounts
    SQLModel.metadata.create_all(engine, tables=[
        users.Users.__table__,
        projects.Projects.__table__,
        projects.ProjectStatus.__table__,
        sso_user.SSOUsers.__table__,
        accounts.Accounts.__table__,
    ])
    SQLModel.metadata.create_all(engine)


def main():
    from core.db import engine
    create_db_and_tables(engine)
    init(engine)
    seed(engine)


if __name__ == "__main__":
    main()
