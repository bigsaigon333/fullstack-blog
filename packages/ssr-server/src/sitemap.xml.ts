import { FastifyReply, FastifyRequest } from "fastify";

import {
  INTERNAL_API_SERVER_ORIGIN,
  PUBLIC_SSR_SERVER_ORIGIN,
} from "./constants";

export async function sitemapHandler(_: FastifyRequest, reply: FastifyReply) {
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

  return reply;
}

export interface Post {
  id: number;
  title: string;
  createdAt: number;
  lastUpdatedAt: number;
  content: string;
}

async function createSitemap(posts: Post[]) {
  return /* xml */ `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${PUBLIC_SSR_SERVER_ORIGIN}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${posts.map(
      (post) => /* xml */ `
      <url>
        <loc>${PUBLIC_SSR_SERVER_ORIGIN}/posts/${post.id}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
        <lastmod>${new Date(post.lastUpdatedAt).toISOString()}</lastmod>
      </url>
      `
    )}
  </urlset>
  `;
}
