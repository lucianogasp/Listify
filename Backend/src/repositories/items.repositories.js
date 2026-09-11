import db from "#config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_prioritized TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY (listId) REFERENCES lists(id)
    )
  `
);