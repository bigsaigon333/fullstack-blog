import Fastify from "fastify";
import { Database } from "sqlite3";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // Adjust the path accordingly

export const startServer = async (db: Database) => {
  const fastify = Fastify();

  // Register the postRoutes module
  fastify.register(postRoutes, { prefix: "api" });
  fastify.register(authRoutes, { prefix: "oauth" });

  // Run the server!
  try {
    await fastify.listen({ port: 8080 });
    console.log("Server is running on port 8080");
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
};
