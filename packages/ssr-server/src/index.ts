import Fastify from "fastify";
import { routeHandler } from "./routes.js";

const fastify = Fastify();

try {
  await Fastify({ logger: true })
    .route({
      method: "GET",
      url: "*",
      handler: routeHandler,
    })
    .listen({ port: 4000 });

  console.log("Server is running on port 4000");
} catch (err) {
  fastify.log.error(err);

  process.exit(1);
}
