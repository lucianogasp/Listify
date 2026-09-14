import db from "#config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id INTEGER,
      title TEXT NOT NULL,
      is_prioritized TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY (list_Id) REFERENCES lists(id)
    )
  `
);

export const getItemsByUserId = (userId) => {
  return new Promise((res, rej) => {
    db.all(
      `
        SELECT items.*
        FROM items
        JOIN lists ON items.list_id = lists.id
        WHERE lists.user_id = ?
      `
      ,[userId]
      ,(err, rows) => {
        if(err) {
          rej(err);
        } else {
          res(rows);
        }
      }
    )
  });
}

export const createItem = (newItem) => {
  const {list_id, title, is_prioritized, status} = newItem;
  return new Promise((res, rej) => {
    db.run(
      `
        INSERT INTO items (list_id, title, is_prioritized, status)
        VALUES (?, ?, ?, ?)
      `
      ,[list_id, title, is_prioritized, status]
      ,function(err) {
        if(err) {
          rej(err);
        } else {
          res({message: 'item created successfully',id: this.lastID});
        }
      }
    )
  });
}

export default {
  getItemsByUserId,
  createItem
}