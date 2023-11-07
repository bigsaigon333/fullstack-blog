import { FastifyReply, FastifyRequest } from "fastify";
import { UserProfile } from "../models/userModel.js";
import {
  authorizeKakao,
  getKakaoProfile,
  logoutKakao,
} from "../services/kakaoService.js";
import { getUserRole } from "../services/userService.js";

const SSR_SERVER_ORIGIN = "http://localhost:3000";
const API_SERVER_ORIGIN = "http://localhost:8080";

export async function getKakaoOAuthToken(
  request: FastifyRequest<{ Querystring: { code: string } }>,
  reply: FastifyReply
) {
  const { code } = request.query;

  try {
    const kakaoResponse = await authorizeKakao(code, API_SERVER_ORIGIN);
    const kakaoSession = { ...kakaoResponse, lastUpdatedAt: Date.now() };
    request.session.set("kakao", kakaoSession);

    reply.redirect(302, SSR_SERVER_ORIGIN);
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

    const kakaoProfile = await getKakaoProfile(kakao.access_token);
    const role = await getUserRole(kakaoProfile.id);
    const userProfile: UserProfile = { ...kakaoProfile, role };

    reply.send(userProfile);
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
