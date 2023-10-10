import { FastifyReply, FastifyRequest } from "fastify";
import {
  authorizeKakao,
  getKakaoProfile,
  logoutKakao,
} from "../services/kakaoService.js";

export async function getKakaoOAuthToken(
  request: FastifyRequest<{ Querystring: { code: string } }>,
  reply: FastifyReply
) {
  const { code } = request.query;

  try {
    const kakaoResponse = await authorizeKakao(code);
    const kakaoSession = { ...kakaoResponse, lastUpdatedAt: Date.now() };
    request.session.set("kakao", kakaoSession);

    reply.redirect(302, "http://localhost:3000");
  } catch (error) {
    console.error((error as Error).message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getMyProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { kakao } = request.session;
    if (kakao == null) {
      reply.send(null);
      return;
    }

    const profile = await getKakaoProfile(kakao.access_token);

    reply.send(profile);
  } catch (error) {
    console.error((error as Error).message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { kakao } = request.session;
    if (kakao == null) {
      reply.send(false);
      return;
    }

    await logoutKakao(kakao.access_token);
    await request.session.destroy();

    reply.send(true);
  } catch (error) {
    console.error((error as Error).message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}
