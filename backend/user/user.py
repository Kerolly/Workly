# user.py
from dns.e164 import query

from backend.user.user_schema import UserIn, UserOut


class User:
    def __init__(self, conn):
        self.conn = conn
        self.table = "Users"

    async def add_user(self, user_data: UserIn):
        query = f"""
        INSERT INTO {self.table} (first_name, last_name, email, password_hash, role, is_active)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id;
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (user_data.first_name,
                                  user_data.last_name,
                                  user_data.email,
                                  user_data.password,
                                  user_data.role,
                                  True,))
            result = await cursor.fetchone()
            await self.conn.commit()

        return result["id"], "ok"


    async def get_user_by_email(self, email: str):
        query = f"""
            SELECT id, email, password_hash, is_active
            FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (email,))

            result = await cursor.fetchone()

        return result

    async def get_full_profile_by_email(self, email:str):
        query = f"""
            SELECT id, first_name, last_name, email, role, is_active, created_at
            FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (email,))

            result = await cursor.fetchone()

        return result

    async def get_user_for_auth(self, email:str):
        query = f"""
            SELECT id, password_hash, email, is_active, role
            FROM {self.table}
            WHERE email = %s 
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (email,))
            result = await cursor.fetchone()

        return result

    async def get_user_dashboard_by_id(self, user_id: int):

        # ==== User Query ===
        query_user = f"""
            SELECT id, first_name, last_name, email, role
            FROM {self.table}
            WHERE id = %s
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_user,
                                 (user_id,))

            user_row = await cursor.fetchone()

        # If not exist, return None
        if user_row is None:
            return None

        # ==== Time Entries Query ===
        query_entries = f"""
            SELECT t.id, t.time_start, t.time_end, a.activity_name
            FROM timeentries AS t
                                JOIN activities AS a ON t.activity_id = a.id
            WHERE t.user_id = %s
            ORDER BY t.time_start DESC
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_entries,
                                 (user_id,))

            entries_rows = await cursor.fetchall() # get all entries for the user


        # ==== Hourly Rates Query ===
        query_rates = f"""
            SELECT hr.hourly_rate_gross, a.activity_name
            FROM hourlyrates AS hr
                                JOIN activities AS a ON a.id = hr.activity_id
            WHERE hr.user_id = %s
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_rates,
                                 (user_id,))

            rates_rows = await cursor.fetchall()  # get all rates for the user


        # === Prepare the response ===
        entries_list = []
        for row in entries_rows:
            entries_list.append({
                "id": row["id"],
                "time_start": row["time_start"],
                "time_end": row["time_end"],
                "activity_name": row["activity_name"],
            })

        dashboard_data = {
            "user_info": {
                "id": user_row["id"],
                "first_name": user_row["first_name"],
                "last_name": user_row["last_name"],
                "email": user_row["email"],
                "role": user_row["role"]
            },
            "time_entries": entries_list, # empty list if no entries
            "hourly_rates": rates_rows
        }

        return dashboard_data

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


