import Fastify from "fastify";
import { Database } from "sqlite3";

import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import crypto from "node:crypto";

import { refreshKakao } from "./hooks/oauth.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // Adjust the path accordingly

export const startServer = async (db: Database) => {
  const secret = crypto.randomBytes(32).toString("hex");
  const fastify = Fastify();

  try {
    await Fastify({ logger: true })
      .register(fastifyCookie)
      .register(fastifySession, {
        secret,
        cookie: { secure: false, httpOnly: true },
        saveUninitialized: false,
      })
      .addHook("preHandler", refreshKakao)
      .register(postRoutes, { prefix: "api" })
      .register(authRoutes, { prefix: "oauth" })
      .listen({ port: 8080 });

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
