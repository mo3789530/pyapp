from fastapi import APIRouter, FastAPI
from routers import projects

app = FastAPI()

api_router = APIRouter()
api_router.include_router(projects.router)

app.include_router(api_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Hello World"}
