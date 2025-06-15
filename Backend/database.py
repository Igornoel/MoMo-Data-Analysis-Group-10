import sqlite3

DB_NAME = "../MTN.db"

def create_database():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        CATEGORY TEXT,
        AMOUNT INTEGER,
        RECIPIENT TEXT,
        TRANSACTION_TYPE TEXT,
        date TIMESTAMP,
        MESSAGE_BODY TEXT
    )''')

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
