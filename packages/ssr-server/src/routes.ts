import ssr from "blog-webfront";
import { FastifyReply, FastifyRequest } from "fastify";

export function routeHandler(request: FastifyRequest, reply: FastifyReply) {
  const { pipe } = ssr.render(request.url, {
    bootstrapScripts: ["/public/main.js"],
    onShellReady: () => {
      reply.header("content-type", "text/html").header("charset", "utf-8");
      pipe(reply.raw);
    },
  });
}
