import { FastifyReply, FastifyRequest } from "fastify";
import ky from "ky";

export type KakaoOAuthTokenResponse = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

const KAKAO_OAUTH_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const CLIENT_ID = "38dad1a0f1c2a8f2064197351a79e6ed";

export async function getKakaoOAuthToken(
  request: FastifyRequest<{ Querystring: { code: string } }>,
  reply: FastifyReply
) {
  const { code } = request.query;

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: encodeURI("http://localhost:8080/oauth/kakao/authorize"),
      code: code,
      client_secret: "Hh7Bu0ohy0X31Bsg78WDMfXy9vzzEoyG",
    });

    const response = await ky.post(KAKAO_OAUTH_TOKEN_URL, { body });
    const json: KakaoOAuthTokenResponse = await response.json();
    const kakaoSession = {
      ...json,
      originDate: Date.now(),
    };

    request.session.set("kakao", kakaoSession);

    reply.redirect(308, "http://localhost:3000");
  } catch (error) {
    console.error((error as Error).message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}

type KakaoProfile = {
  is_default_image: boolean;
  nickname: string;
  profile_image_url: string;
  thumbnail_image_url: string;
};

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

    const {
      kakao_account: { profile },
    } = await ky
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${kakao.access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        searchParams: {
          property_keys: JSON.stringify(["kakao_account.profile"]),
        },
      })
      .json<{ kakao_account: { profile: KakaoProfile } }>();

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
      reply.send(null);
      return;
    }

    await ky
      .post("https://kapi.kakao.com/v1/user/logout", {
        headers: { Authorization: `Bearer ${kakao.access_token}` },
      })
      .json<{ id: number }>();

    await request.session.destroy();

    reply.send(true);
  } catch (error) {
    console.error((error as Error).message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}
