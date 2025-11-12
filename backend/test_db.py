from fastapi.params import Depends

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
    result = await get_user.get_user_by_email("nana@gmail.ro")
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
    # 1. Creează generatorul (nu rulează încă)
    db_generator = get_db_connection()

    # 2. Folosește 'async for' pentru a rula generatorul
    #    Python va face automat următorii pași:
    #    a) Rulează codul din 'get_db_connection' până la 'yield conn'.
    #    b) Atribuie valoarea lui 'conn' variabilei 'db'.
    #    c) Rulează codul din interiorul buclei 'async for'.
    #    d) Când bucla se termină, rulează automat codul din 'finally'
    #       (adică 'await conn.close()').

    async for db in db_generator:
        # 3. 'db' este acum OBIECTUL CONEXIUNE REAL
        try:
            new_user = User(conn=db)

            res = await new_user.get_full_profile_by_email("andrei@gmail.com")
            print("Rezultatul testului:", res)

        except Exception as e:
            print(f"A apărut o eroare în timpul testului: {e}")
            # Chiar dacă apare o eroare, blocul 'finally'
            # din generator tot se va executa și va închide conexiunea.


# ... restul codului tău de test
# asyncio.run(test_profile())

#asyncio.run(test())
#asyncio.run(test_get_all_users())
#asyncio.run(test_delete_user())
asyncio.run(test_profile())