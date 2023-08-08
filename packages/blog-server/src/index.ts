// Import the framework and instantiate it
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return "Hello, world!";
});

// Run the server!
try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
