import db from "#config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `
);

const getUserByEmail = email => {
  return new Promise((res, rej) => {
    db.get(
      `
        SELECT * FROM users
        WHERE email = ?
      `
      ,[email]
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

 const userRegister = (email, hash) => {
  return new Promise((res, rej) => {
    db.run(
      `
        INSERT INTO users (email, password)
        VALUES (?, ?)
      `
      ,[email, hash]
      ,function(err) {
        if(err) {
          rej(err);
        } else {
          res({id: this.lastID, email, hash});
        }
      }
    )
  });
}

export default {
  getUserByEmail,
  userRegister
}