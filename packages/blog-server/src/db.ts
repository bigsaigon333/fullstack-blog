import sqlite3 from "sqlite3";
import { promisify } from "util";

const sqlite3Verbose = sqlite3.verbose();
const db = new sqlite3Verbose.Database("blog-server.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
    process.exit(1);
  } else {
    console.log("Connected to the database");
  }
});

// DDL
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
    title TEXT NOT NULL,
    date INTEGER NOT NULL
  );
`;

db.run(createTableSQL, (err) => {
  if (err) {
    console.error("Error creating table:", err);
    process.exit(1);
  }
});

export default db;