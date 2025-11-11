from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import users_router, auth_routers
from backend.schemas.user_schema import UserOut
from backend.utils.auth_deps import get_current_active_user

app = FastAPI()

origins = [
    "http://localhost:5173", # for development
    "https://exemple.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # allow all origins from the list
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GET POST PUT DELETE

app.include_router(users_router.router)
app.include_router(auth_routers.router)

@app.get("/")
def index():
    return {"Hello": "World"}

@app.get("/profile", response_model=UserOut)
def get_profile(current_user: UserOut = Depends(get_current_active_user)):
    return current_user

@app.get("/verify-token")
async def verify_token_endpoint(current_user: UserOut = Depends(get_current_active_user)):
    return {
        "valid": True,
        "user": {
            "id": current_user.id,
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
            "email": current_user.email,
            "role": current_user.role
        }
    }
