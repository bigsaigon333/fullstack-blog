// Import the framework and instantiate it
import Fastify from "fastify";
import Sqlite3 from "sqlite3";

const fastify = Fastify({ logger: true });
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS post (
    title TEXT,
    date INTEGER
  )`);

  db.run(
    "INSERT INTO post (title, date) VALUES ($title, $date)",
    {
      $title: `test${Date.now()}`,
      $date: Date.now(),
    },
    function (err) {
      if (err) {
        console.error("Error inserting post:", err);
      } else {
        console.log("New post inserted with ID:", this.lastID);
      }
    }
  );

  db.run(
    "INSERT INTO post (title, date) VALUES ($title, $date)",
    {
      $title: `test${Date.now()}`,
      $date: Date.now(),
    },
    function (err) {
      if (err) {
        console.error("Error inserting post:", err);
      } else {
        console.log("New post inserted with ID:", this.lastID);
      }
    }
  );

  db.all("SELECT * FROM post", [], (err, rows) => {
    if (err) {
      console.error("Error querying posts:", err);
    } else {
      console.log("All posts:", rows);
    }
  });
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return "Hello, world!";
});

// Run the server!
try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  db.close((err) => {
    if (err) {
      console.log(err);
    }

    console.log("db is closing");
  });
  process.exit(1);
}
