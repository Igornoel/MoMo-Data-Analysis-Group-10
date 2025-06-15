CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    amount INTEGER NOT NULL,
    sender TEXT,
    recipient TEXT,
    transaction_id TEXT,
    agent_name TEXT,
    agent_phone TEXT,
    bundle_size INTEGER,
    validity_days INTEGER,
    date DATETIME NOT NULL
);

CREATE TABLE logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    error_reason TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
