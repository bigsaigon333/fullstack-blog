import * as ssr from "blog-webfront/server";
import { FastifyReply, FastifyRequest } from "fastify";

export function routeHandler(request: FastifyRequest, reply: FastifyReply) {
  const { pipe } = ssr.render(request.url, {
    bootstrapScripts: ["/public/main.js"],
    onShellReady: () => {
      reply.raw
        .setHeader("content-type", "text/html")
        .setHeader("charset", "utf-8");

      pipe(reply.raw);
    },
  });
}
