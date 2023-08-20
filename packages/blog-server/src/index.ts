import Fastify, { FastifyRequest } from "fastify";
import Sqlite3 from "sqlite3";
import { v4 as uuidv4 } from "uuid";

const fastify = Fastify({ logger: true });
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database("blog-server.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS post (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    date INTEGER
  )`);
});

fastify.post(
  "/posts",
  (
    request: FastifyRequest<{ Body: { title: string; date: number } }>,
    reply
  ) => {
    // TODO: title, date runtime validation
    const { title, date } = request.body;

    const id = uuidv4();

    db.run(
      "INSERT INTO post (title, date, id) VALUES ($title, $date, $id)",
      { $title: title, $date: date, $id: id },
      function (err) {
        if (err) {
          console.error("Error inserting post:", err);
          reply.status(500).send(err.message);
        } else {
          console.log("New post inserted with ID:", id);
          reply
            .status(200)
            .headers({ location: `/posts/${id}` })
            .send();
        }
      }
    );
  }
);

fastify.get(
  "/posts/:id",
  (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply
  ) => {
    const { id } = request.params;

    db.get(
      "SELECT * FROM post WHERE id = $id",
      { $id: id },
      function (err, row) {
        if (err) {
          console.error(err);
          reply.status(500).send(err.message);
          return;
        }

        if (!row) {
          reply.status(404).send();
          return;
        }

        reply.status(200).send(row);
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
