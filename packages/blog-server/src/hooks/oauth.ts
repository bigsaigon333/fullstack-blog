import { FastifyRequest } from "fastify";

export async function refreshKakao(request: FastifyRequest) {
  const { kakao } = request.session;
  if (kakao == null) return;

  const { lastUpdatedAt, expires_in } = kakao;
  const expires = lastUpdatedAt + expires_in * 1000;
  const now = Date.now();

  if (expires <= now) {
    // TODO: referesh token
  }
}
