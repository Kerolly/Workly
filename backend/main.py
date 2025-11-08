from fastapi import FastAPI
from backend.routers import users_router

app = FastAPI()

# GET POST PUT DELETE

app.include_router(users_router.router)

@app.get("/")
def index():
    return {"Hello": "World"}