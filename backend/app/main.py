from fastapi import APIRouter, FastAPI
from routers import projects, users


app = FastAPI()

api_router = APIRouter()
api_router.include_router(projects.router)
api_router.include_router(users.router)

app.include_router(api_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Hello World"}
