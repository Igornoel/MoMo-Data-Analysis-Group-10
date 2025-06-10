import json
import logging
from database import create_database, DB_NAME
import sqlite3

# Initialize database
create_database()

# Configure logging
logging.basicConfig(filename="../Logs/unprocessed_sms.log", level=logging.INFO, format="%(asctime)s - %(message)s")

def insert_transaction(data):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO transactions 
        (transaction_id, transaction_type, sender, receiver, amount, fee, date, extra_details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['transaction_id'],
        data['transaction_type'],
        data['sender'],
        data['receiver'],
        data['amount'],
        data['fee'],
        data['date'],
        data['extra_details']
    ))
    conn.commit()
    conn.close()

def parse_sms_data(json_path):
    try:
        with open(json_path, "r", encoding="utf-8") as file:
            sms_list = json.load(file)

        for sms in sms_list:
            try:
                transaction_type = sms.get("type", "Unknown")
                receiver = sms.get("recipient", "")
                sender = "You"
                amount = sms.get("amount", 0)
                fee = sms.get("fee", 0)
                date = sms.get("datetime", "")
                transaction_id = sms.get("code") or sms.get("phone") or f"{receiver}_{amount}_{date}"
                extra_details = json.dumps(sms)

                data = {
                    "transaction_id": transaction_id,
                    "transaction_type": transaction_type,
                    "sender": sender,
                    "receiver": receiver,
                    "amount": amount,
                    "fee": fee,
                    "date": date,
                    "extra_details": extra_details
                }

                insert_transaction(data)

            except Exception as e:
                logging.info(f"Failed to insert: {sms} — Reason: {str(e)}")

    except FileNotFoundError:
        logging.error(f"File not found: {json_path}")
    except json.JSONDecodeError as e:
        logging.error(f"JSON decode error: {str(e)}")

if __name__ == "__main__":
    parse_sms_data("../Data/parsed_sms_file.json")