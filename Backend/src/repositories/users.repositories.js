import db from "#config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT UNIQUE NOT NULL
    )
  `
);