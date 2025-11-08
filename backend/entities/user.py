# user.py

import psycopg
from backend.schemas.user_schema import UserIn, UserOut
from backend.utils.hashing import hash_password

class User:
    def __init__(self, conn):
        self.conn = conn
        self.table = "Users"

    async def add_user(self, user_data: UserIn):
        query = f"""
        INSERT INTO {self.table} (first_name, last_name, email, password_hash, role)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id;
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (user_data.first_name,
                                  user_data.last_name,
                                  user_data.email,
                                  hash_password(user_data.password),
                                  user_data.role))
            result = await cursor.fetchone()
            await self.conn.commit()

        return result["id"], "ok"


    async def get_user_by_email(self, user_data: UserOut):
        query = f"""
            SELECT id, first_name, last_name, role, password_hash
            FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (user_data.email,))

            result = await cursor.fetchone()

        return result

    async def get_all_users(self, limit: int = 100):
        query = f"""
            SELECT * FROM {self.table}
            LIMIT {limit}
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query)

            results = await cursor.fetchall()

        return results

    async def delete_user_by_email(self, user_data: UserOut):
        query = f"""
            DELETE FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (user_data.email,))
            await self.conn.commit()
        return "Ok"


