import sqlite3 from "sqlite3";

const sqlite3Verbose = sqlite3.verbose();
const db = new sqlite3Verbose.Database("blog-server.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
    process.exit(1);
  } else {
    console.log("Connected to the database");
  }
});

export default db;
