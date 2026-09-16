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

const getListsByUserId = (userId) => {
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
          res(rows);
        }
      }
    );
  });
}

const createList = (newList) => {
  const {userId, name, description} = newList;
  return new Promise((res, rej) => {
    db.run(
      `
        INSERT INTO lists (user_id, name, description)
        VALUES (?, ?, ?)
      `
      ,[userId, name, description]
      ,function(err) {
        if(err) {
          rej(err);
        } else {
          res({message: 'list created successfully',id: this.lastID});
        }
      }
    )
  });
}

export default {
  getListsByUserId,
  createList
}