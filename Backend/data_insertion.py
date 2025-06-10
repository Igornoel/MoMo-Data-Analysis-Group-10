import json
import sqlite3

DB_NAME = "../Data/sms_transactions.db"

def load_sms_data(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        return json.load(file)

def insert_into_db(sms_list):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    for sms in sms_list:
        try:
            transaction_id = sms.get("code") or sms.get("phone") or f"{sms.get('recipient')}_{sms.get('amount')}_{sms.get('datetime')}"
            transaction_type = sms.get("type")
            sender = "You"
            receiver = sms.get("recipient", "")
            amount = sms.get("amount", 0)
            fee = sms.get("fee", 0)
            date = sms.get("datetime", "")
            extra_details = json.dumps(sms)

            cursor.execute('''
                INSERT OR IGNORE INTO transactions 
                (transaction_id, transaction_type, sender, receiver, amount, fee, date, extra_details)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                transaction_id, transaction_type, sender, receiver, amount, fee, date, extra_details
            ))

        except Exception as e:
            print(f"Failed to insert SMS: {sms}\\nReason: {e}")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    sms_data = load_sms_data("../Data/parsed_sms_file.json")
    insert_into_db(sms_data)
    print("Data inserted successfully!")

