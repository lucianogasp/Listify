import db from "#config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `
);