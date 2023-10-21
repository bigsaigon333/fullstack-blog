import httpProxy from "@fastify/http-proxy";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import { routeHandler } from "./routes.js";

const API_SERVER_UPSTREAM = "http://localhost:8080";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const fastify = await Fastify({
    logger: envToLogger[process.env.NODE_ENV!] ?? true,
  });

  try {
    fastify
      .register(fastifyStatic, {
        root: path.join(__dirname, "../public"),
        prefix: "/public/",
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
      .listen({ port: 4000 });

    console.log("Server is running on port 4000");
  } catch (err) {
    fastify.log.error(err);

    process.exit(1);
  }
}

run();
