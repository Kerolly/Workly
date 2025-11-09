# database.py
# This file will handle database connections and operations

import psycopg
from dotenv import load_dotenv
import os
from psycopg.rows import dict_row
from pathlib import Path

# Load environment variables from .env file
BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

DB_NAME = os.getenv("DATABASE_NAME")
DB_USER = os.getenv("DATABASE_USER")
DB_PASSWORD = os.getenv("DATABASE_PASSWORD")


# Connect to the PostgreSQL database
async def get_db_connection():
    conn = await psycopg.AsyncConnection.connect(host="localhost",
                           dbname=DB_NAME,
                           user=DB_USER,
                           password=DB_PASSWORD,
                           port=5432,
                            row_factory=dict_row)
    return conn