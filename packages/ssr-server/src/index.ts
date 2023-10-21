import Fastify from "fastify";
import { routeHandler } from "./routes.js";

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
  const fastify = Fastify();

  try {
    await Fastify({
      logger: envToLogger[process.env.NODE_ENV!] ?? true,
    })
    await Fastify({ logger: false })
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
