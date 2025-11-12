# auth_routers.py
import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm


from backend.user.user import User
from backend.auth.auth_schema import Token
from backend.user.user_schema import UserOut, UserIn
from backend.utils.database import get_db_connection
from backend.auth.jwt_handler import create_access_token
from backend.utils.pwd_handler import hash_password, verify_password

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")
load_dotenv()
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut)
async def register_user(user: UserIn):
    db = await get_db_connection()

    user_repo = User(db)
    user_dict = await user_repo.get_user_for_auth(user.email)
    if user_dict is not None:
        raise HTTPException(
            status_code=404,
            detail="User already exists",
        )

    hashed_password = hash_password(user.password)

    user_data = UserIn(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password= hashed_password,
        role=user.role
    )

    result = await user_repo.add_user(user_data)
    await db.close()

    return user_data

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = await get_db_connection()

    user_repo = User(db)
    user_dict = await user_repo.get_user_for_auth(form_data.username)

    if user_dict is None or verify_password(form_data.password, user_dict["password_hash"]) is False:
        await db.close()
        raise HTTPException(
            status_code=404,
            detail="Wrong Info!",
        )

    if user_dict["is_active"] == False:
        raise HTTPException(
            status_code=404,
            detail="Inactive user",
        )

    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user_dict["email"]}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}