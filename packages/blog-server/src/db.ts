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

// DDL
const createTableSQL = /* sql */ `
-- Posts 테이블 생성
  CREATE TABLE IF NOT EXISTS Posts (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL UNIQUE,
    "createdAt"	INTEGER NOT NULL,
    "lastUpdatedAt"	INTEGER NOT NULL
  );

-- Create PostContents table with a foreign key reference to Posts
  CREATE TABLE IF NOT EXISTS PostContents (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL UNIQUE,
    "content" TEXT NOT NULL,
    FOREIGN KEY("postId") REFERENCES Posts("id")
  );
`;

db.run(createTableSQL, (err) => {
  if (err) {
    console.error("Error creating table:", err);
    process.exit(1);
  }
});

export default db;
