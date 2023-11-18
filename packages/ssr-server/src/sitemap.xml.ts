import { FastifyReply, FastifyRequest } from "fastify";

import { INTERNAL_API_SERVER_ORIGIN } from "./constants";

export async function sitemapHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { default: ky } = await import("ky");
  const { data: posts } = await ky
    .get("api/posts", {
      searchParams: { size: 1_000_000 },
      prefixUrl: INTERNAL_API_SERVER_ORIGIN,
    })
    .json<{ data: Post[] }>();
  const sitemap = await createSitemap(posts);

  reply.header("Content-Type", "application/xml");
  reply.send(sitemap);
}

export interface Post {
  id: number;
  title: string;
  createdAt: number;
  lastUpdatedAt: number;
  content: string;
}

async function createSitemap(posts: Post[]) {
  return JSON.stringify(posts, null, 2);
}
