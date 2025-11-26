# dashboard_routers.py

from fastapi import APIRouter, Depends, HTTPException, status

from backend.auth.auth_deps import get_current_active_user
from backend.user.user import User
from backend.user.user_schema import UserOut
from backend.utils.database import get_db_connection

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/employee/{user_id}")
async def get_employee_dashboard(user_id: int, current_user: UserOut = Depends(get_current_active_user), db=Depends(get_db_connection)):

    #print("User id: ", user_id)
    user_repo = User(db)
    user_data = await user_repo.get_user_dashboard_by_id(user_id)

    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found")

    return user_data