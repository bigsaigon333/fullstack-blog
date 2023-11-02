import * as ssr from "blog-webfront/server";
import { FastifyReply, FastifyRequest } from "fastify";

export function routeHandler(request: FastifyRequest, reply: FastifyReply) {
  const { render, dehydrate } = ssr.makeRenderContext({
    url: request.url,
    cookie: request.headers.cookie,
  });

  const { pipe } = render({
    bootstrapScripts: ["/public/main.js"],
    onAllReady: () => {
      reply.raw
        .setHeader("content-type", "text/html")
        .setHeader("charset", "utf-8");

      pipe(reply.raw);

      const dehydrateBuffer = Buffer.from(dehydrate(), "utf-8");
      reply.raw.write(dehydrateBuffer);
    },
  });
}
