import db from "#config/database.js";
import { ItemQuery } from "#services/ItemQuery.js";

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

const getItemsByUserId = (userId) => {
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
    );
  });
}

const getItemById = (item_id, list_id, userId) => {
  return new Promise((res, rej) => {
    db.get(
      `
        SELECT * FROM items
        WHERE id = ?
          AND list_id = ?
          AND EXISTS(
            SELECT 1 FROM lists
            WHERE lists.id = items.list_id
              AND lists.user_id = ?
          )
      `
      ,[item_id, list_id, userId]
      ,(err, row) => {
        if(err) {
          rej(err);
        } else {
          res(row);
        }
      }
    );
  });
}

const createItem = (list_id, newItem) => {
  const {title, is_prioritized, status} = newItem;
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
          res({message: 'item created successfully', id: this.lastID});
        }
      }
    );
  });
}

const deleteItem = (item_id, list_id, userId) => {
  return new Promise((res, rej) => {
    db.run(
      `
        DELETE FROM items
        WHERE id = ?
          AND list_id = ?
          AND EXISTS(
            SELECT 1 FROM lists
            WHERE lists.id = items.list_id
              AND lists.user_id = ?
          )
      `
      ,[item_id, list_id, userId]
      ,(err) => {
        if(err) {
          rej(err);
        } else {
          res({message: 'item deleted successfully!'})
        }
      }
    );
  });
}

const updateItem = (updateFields, item_id, list_id, userId) => {
  const queryFields = [];
  const values = [];
  Object.keys(updateFields).forEach(field => {
    queryFields.push(`${field} = ?`);
    values.push(updateFields[field]);
  });
  const query = `
    UPDATE items
    SET ${queryFields.join(', ')}
    WHERE id = ?
      AND list_id = ?
      AND EXISTS(
        SELECT 1 FROM lists
        WHERE lists.id = items.list_id
          AND lists.user_id = ?
      )
  `;
  
  return new Promise((res, rej) => {
    db.run(
      query
      ,[...values, item_id, list_id, userId]
      ,(err) => {
        if(err) {
          rej(err);
        } else {
          res({message: 'item updated successfully!'});
        }
      }
    );
  });
}

export default {
  getItemsByUserId,
  getItemById,
  createItem,
  deleteItem,
  updateItem
}