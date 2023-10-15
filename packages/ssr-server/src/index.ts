import Fastify from "fastify";

const fastify = Fastify();

try {
  await Fastify({ logger: true }).listen({ port: 4000 });

  console.log("Server is running on port 4000");
} catch (err) {
  fastify.log.error(err);

  process.exit(1);
}
