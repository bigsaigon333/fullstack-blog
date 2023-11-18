import { FastifyReply, FastifyRequest } from "fastify";

export const ogImageSchema = {
  querystring: {
    type: "object",
    properties: {
      title: { type: "string" },
      url: { type: "string" },
      width: { type: "number" },
      height: { type: "number" },
    },
    required: ["title", "url"],
  },
};

export async function ogImageRouter(
  request: FastifyRequest<{
    Querystring: {
      title: string;
      url: string;
      width?: number;
      height?: number;
    };
  }>,
  reply: FastifyReply
) {
  const { title, width = 1200, height = 630, url } = request.query;

  return createOgImage({ title, width, height, url });
}

function createOgImage({
  title,
  width,
  height,
  url,
}: {
  title: string;
  width: number;
  height: number;
  url: string;
}) {
  return { title, width, height, url };
}
