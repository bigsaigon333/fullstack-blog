import Fastify, { FastifyRequest } from "fastify";
import Sqlite3 from "sqlite3";

const fastify = Fastify({ logger: true });
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database("blog-server.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
    title TEXT NOT NULL,
    date INTEGER NOT NULL
  );`);
});

fastify.post(
  "/posts",
  (
    request: FastifyRequest<{ Body: { title: string; date: number } }>,
    reply
  ) => {
    // TODO: title, date runtime validation / fastify의 내장된 validation도 있음
    const { title, date } = request.body;

    db.run(
      "INSERT INTO post (title, date) VALUES ($title, $date)",
      { $title: title, $date: date },
      function (err) {
        if (err) {
          console.error("Error inserting post:", err);
          reply.status(500).send(err.message);
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

fastify.get("/posts", (request: FastifyRequest, reply) => {
  db.get("SELECT * FROM post", function (err, row) {
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
  });
});

fastify.get(
  "/posts/:id",
  (
    request: FastifyRequest<{
      Params: {
        id: number;
      };
    }>,
    reply
  ) => {
    // TODO: id runtime validation
    const id = Number(request.params.id);

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
