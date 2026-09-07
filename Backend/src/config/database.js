import sqlite3 from "sqlite3";

const db = new sqlite3.Database("Listify_db.sqlite3.sqlite", err => {
  if (err) {
    console.error('Erro ao conectar com bando de dados SQLite: ', err.message);
    return;
  }
  console.log('Conectado ao banco de dados SQLite com sucesso');
});

export default db;