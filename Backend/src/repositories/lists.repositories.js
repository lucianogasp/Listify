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

const getListById = (list_id, userId) => {
  return new Promise((res, rej) => {
    db.get(
      `
        SELECT * FROM lists
        WHERE id = ?
          AND user_id = ?
      `
      ,[list_id, userId]
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
          res({message: 'list created successfully', id: this.lastID});
        }
      }
    );
  });
}

const deleteList = (list_id, userId) => {
  return new Promise((res, rej) => {
    db.run(
      `
        DELETE FROM lists
        WHERE id = ?
          AND user_id = ?
      `
      ,[list_id, userId]
      ,(err) => {
        if(err) {
          rej(err);
        } else {
          res({message: 'list deleted successfully!'});
        }
      }
    );
  });
}

const updateList = (updateFields, list_id, userId) => {
  const queryFields = [];
  const values = [];
  Object.keys(updateFields).forEach(field => {
    queryFields.push(`${field} = ?`);
    values.push(updateFields[field]);
  });
  const query = `
    UPDATE lists
    SET ${queryFields.join(', ')}
    WHERE id = ?
      AND user_id = ?  
  `
  return new Promise((res, rej) => {
    db.run(
      query
      ,[...values, list_id, userId]
      ,(err) => {
        if(err) {
          rej(err);
        } else {
          res({ message: 'list updated successfully!' });
        }
      }
    );
  });
}

export default {
  getListsByUserId,
  getListById,
  createList,
  deleteList,
  updateList
}