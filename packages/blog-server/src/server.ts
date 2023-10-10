import Fastify from "fastify";
import { Database } from "sqlite3";

import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import crypto from "node:crypto";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // Adjust the path accordingly
import { KakaoOAuthTokenResponse } from "./controllers/authController.js";

export const startServer = async (db: Database) => {
  const fastify = Fastify();

  const secret = crypto.randomBytes(32).toString("hex");

  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret,
    cookie: {
      secure: false, // Set to true for HTTPS
      maxAge: 86_400_000, // 1 day in milliseconds
      httpOnly: true,
    },
  });

  fastify.addHook("preHandler", async (request) => {
    const kakao = request.session.kakao as
      | (KakaoOAuthTokenResponse & { originDate: number })
      | undefined;
    if (kakao == null) return;

    const { originDate, expires_in } = kakao;
    const expires = originDate + expires_in;
    const now = Date.now();
    if (expires <= now) {
      // TODO: referesh token
    }
  });

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
