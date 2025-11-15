# dashboard_routers.py

from fastapi import APIRouter, Depends

from backend.user.user import User
from backend.utils.database import get_db_connection

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/employee/{user_id}")
async def get_employee_dashboard(user_id: int, db=Depends(get_db_connection)):

    user_repo = User(db)
    user_data = await user_repo.get_user_dashboard_by_id(user_id)

    if user_data:
        return user_data

    return {"message": "User not found"}