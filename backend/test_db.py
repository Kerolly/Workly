from backend.utils.database import get_db_connection
from backend.user.user import User
from backend.user.user_schema import UserIn, UserOut
import asyncio

#
# conn = get_db_connection()
# print("Database connection established:", conn)
#
# # Test database connection
# with conn.cursor() as cursor:
#     cursor.execute("SELECT current_database(), current_user")
#     db_name, user = cursor.fetchone()
#     print(f"Connected to database: {db_name} as user: {user}")
#
#     cursor.execute("""SELECT *
#                       FROM users
#                    """)
#     print("Users:", cursor.fetchall())

#conn.close()

# For windows
asyncio.set_event_loop_policy(
    asyncio.WindowsSelectorEventLoopPolicy()
)

async def test():
    conn = await get_db_connection()
    new_user = User(conn)
    user_data = UserIn(
        first_name="John",
        last_name="Doe",
        email="nana@gmail.ro",
        password="AnaAreMere",
        role="admin"
    )
    print(await new_user.add_user(user_data))

    get_user = User(conn)
    user_data = UserOut(
        email="nana@gmail.ro"
    )

    result = await get_user.get_user_by_email(user_data)
    print(result)

    await conn.close()

async def test_get_all_users():
    conn = await get_db_connection()
    user = User(conn)
    result = await user.get_all_users()
    print(result)

    await conn.close()


async def test_delete_user():
    conn = await get_db_connection()
    user = User(conn)
    user_data = UserOut(
        email="nana@gmail.ro"
    )
    result = await user.delete_user_by_email(user_data)
    print(result)

    await conn.close()


async def test_profile():
    conn = await get_db_connection()
    new_user = User(conn)

    res = await new_user.get_full_profile_by_email("andrei@gmail.com")
    print(res)
    await conn.close()

#asyncio.run(test())
#asyncio.run(test_get_all_users())
#asyncio.run(test_delete_user())
asyncio.run(test_profile())