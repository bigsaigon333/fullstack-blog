import * as ssr from "blog-webfront/server";
import { FastifyReply, FastifyRequest } from "fastify";

export function routeHandler(request: FastifyRequest, reply: FastifyReply) {
  const { pipe } = ssr.render(
    { url: request.url, cookie: request.headers.cookie },
    {
      bootstrapScripts: ["/public/main.js"],
      onAllReady: () => {
        reply.raw
          .setHeader("content-type", "text/html")
          .setHeader("charset", "utf-8");

        pipe(reply.raw);
      },
    }
  );
}
