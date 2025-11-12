# users_router

from typing import List
from fastapi import APIRouter, Depends, HTTPException

from backend.auth.auth_deps import get_current_active_user
from backend.utils.database import get_db_connection
from backend.user.user_schema import UserIn, UserOut
from backend.user.user import User


router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=List[UserOut])
async def get_users(current_user: UserOut = Depends(get_current_active_user), db = Depends(get_db_connection)):

    user_repo = User(db)
    users = await user_repo.get_all_users()

    return users


@router.post("/", response_model=UserOut)
async def create_user(user_data: UserIn, current_user: UserOut = Depends(get_current_active_user)):
    conn = await get_db_connection()
    user_repo = User(conn)
    user_id, status = await user_repo.add_user(user_data)
    await conn.close()
    if status == "ok":
        return user_data.model_dump()
    raise HTTPException(status_code=400, detail="User not created!")

