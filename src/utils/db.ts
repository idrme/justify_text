import Database from "better-sqlite3";

// crée un fichier database.sqlite s’il n’existe pas
const db = new Database("database.sqlite");

// création table si elle n’existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER,
    nb_words INTEGER,
    email TEXT UNIQUE,
    token INTEGER
  )
`);

export default db;