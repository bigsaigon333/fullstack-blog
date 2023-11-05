import * as ssr from "blog-webfront/server";
import { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs/promises";
import { getAssetDirectory } from "./utils";

export async function routeHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const assetMap = await getAssetMap();
  const { render, dehydrate } = ssr.makeRenderContext({
    url: request.url,
    cookie: request.headers.cookie,
    assetMap,
  });

  const { pipe } = render({
    bootstrapScripts: assetMap.js,
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

async function getAssetMap() {
  const dir = getAssetDirectory();
  const files = await fs.readdir(dir);
  const js = files
    .filter((file) => file.endsWith("js"))
    .map((file) => `/public/${file}`);
  const css = files
    .filter((file) => file.endsWith("css"))
    .map((file) => `/public/${file}`);

  return { js, css };
}
