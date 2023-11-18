import httpProxy from "@fastify/http-proxy";
import Fastify from "fastify";
import fs from "node:fs";
import path from "node:path";
import { INTERNAL_API_SERVER_ORIGIN } from "./constants.js";
import { routeHandler } from "./routes.js";
import { sitemapHandler } from "./sitemap.xml.js";
import { getAssetDirectory } from "./utils.js";

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
          const dir = getAssetDirectory();
          const filename = request.url.replace("/public/", "");
          const stream = fs.createReadStream(path.join(dir, filename));

          reply.header("Cache-Control", "public, max-age=31536000");

          if (filename.endsWith(".js")) {
            reply.type("text/javascript");
          } else if (filename.endsWith(".css")) {
            reply.type("text/css");
          }

          reply.send(stream);
        },
      })
      .register(httpProxy, {
        upstream: INTERNAL_API_SERVER_ORIGIN,
        prefix: "/api",
        rewritePrefix: "/api",
      })
      .route({
        method: "GET",
        url: "/sitemap.xml",
        handler: sitemapHandler,
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
