// Import the framework and instantiate it
import Fastify, { FastifyRequest } from "fastify";
import Sqlite3 from "sqlite3";

const fastify = Fastify({ logger: true });
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database("blog-server.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS post (
    title TEXT,
    date INTEGER
  )`);
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return "Hello, world!";
});

fastify.post(
  "/posts",
  (
    request: FastifyRequest<{ Body: { title: string; date: number } }>,
    reply
  ) => {
    // TODO: title, date runtime validation
    const { title, date } = request.body;

    db.run(
      "INSERT INTO post (title, date) VALUES ($title, $date)",
      { $title: title, $date: date },
      function (err) {
        if (err) {
          console.error("Error inserting post:", err);
          reply.status(400).send(err.message);
        } else {
          console.log("New post inserted with ID:", this.lastID);
          reply
            .status(200)
            .headers({ location: `/posts/${this.lastID}` })
            .send();
        }
      }
    );
  }
);

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
