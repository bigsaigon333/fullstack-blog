import * as ssr from "blog-webfront/server";
import { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs/promises";
import path from "node:path";

export async function routeHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bootstrapScripts = await getBootstrapScripts();
  const { render, dehydrate } = ssr.makeRenderContext({
    url: request.url,
    cookie: request.headers.cookie,
  });

  const { pipe } = render({
    bootstrapScripts,
    onAllReady: () => {
      reply.raw
        .setHeader("content-type", "text/html")
        .setHeader("charset", "utf-8");

      pipe(reply.raw);

      const dehydrateBuffer = Buffer.from(dehydrate(), "utf-8");
      reply.raw.write(dehydrateBuffer);
    },
  });

  return reply;
}

async function getBootstrapScripts() {
  const dir = path.dirname(require.resolve("blog-webfront/client"));
  const files = await fs.readdir(dir);
  const bootstrapScripts = files
    .filter((file) => file.endsWith("js"))
    .map((file) => `/public/${file}`);

  return bootstrapScripts;
}
