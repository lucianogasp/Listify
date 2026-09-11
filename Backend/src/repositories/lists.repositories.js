import db from "#config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `
);

export const getListsByUserRepository = (userId) => {
  return new Promise((res, rej) => {
    db.all(
      `
        SELECT * FROM lists
        WHERE user_id = ?
      `
      ,[userId]
      ,(err, rows) => {
        if(err) {
          rej(err);
        } else {
          console.log(userId);
          console.log(rows);
          res(rows);
        }
      }
    );
  });
}