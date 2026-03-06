# user_routers.py
from backend.user.user import User
from backend.user.user_schema import UserOut
from backend.utils.database import get_db_connection
from fastapi import APIRouter, Depends
from backend.auth.auth_deps import get_current_active_user

router = APIRouter(prefix="/api/users", tags=["Settings"])


# Get user profile infos
@router.get("/me/settings/profile")
def get_user_profile(current_user: UserOut = Depends(get_current_active_user), db=Depends(get_db_connection)):
    return {"current_user": current_user}


# Get user hourly rate infos
@router.get("/me/settings/hourly-rates")
async def get_user_hourly_rates(current_user: UserOut = Depends(get_current_active_user),
                                db=Depends(get_db_connection)):
    # Verify role
    if current_user.role != "manager":

        user_repo = User(conn=db)

        rates_list = await user_repo.get_user_hourly_rates(current_user.id)

        return {"rates": rates_list}

    else:
        return {"rates": []}
