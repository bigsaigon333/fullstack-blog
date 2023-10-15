import { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = await fs.readFile(
  path.resolve(__dirname, "./index.html"),
  "utf-8"
);

export function routeHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.header("content-type", "text/html").send(html);
}
