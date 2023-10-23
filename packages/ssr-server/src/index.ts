import httpProxy from "@fastify/http-proxy";
import Fastify from "fastify";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { routeHandler } from "./routes.js";

const API_SERVER_UPSTREAM = "http://localhost:8080";
const PORT = 3000;

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

async function run() {
  const fastify = await Fastify({
    logger: envToLogger[process.env.NODE_ENV!] ?? true,
  });

  try {
    fastify
      .route({
        method: "GET",
        url: "/public/*",
        handler: (request, reply) => {
          const dir = dirname(require.resolve("blog-webfront/client"));
          const filename = request.url.replace("/public/", "");
          const stream = fs.createReadStream(path.join(dir, filename));

          reply.send(stream);
        },
      })
      .register(httpProxy, {
        upstream: API_SERVER_UPSTREAM,
        prefix: "/api",
        rewritePrefix: "/api",
      })
      .register(httpProxy, {
        upstream: API_SERVER_UPSTREAM,
        prefix: "/oauth",
        rewritePrefix: "/oauth",
      })
      .route({
        method: "GET",
        url: "*",
        preValidation: (request, reply, done) => {
          if (request.url === "/favicon.ico") {
            reply.code(404).send();
            return;
          }
          done();
        },
        handler: routeHandler,
      })
      .setErrorHandler((error, request, reply) => {
        reply.code(500).send({ ok: false, message: error.message });
      })
      .listen({ port: PORT });

    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);

    process.exit(1);
  }
}

run();
