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

export async function getKakaoOauthToken(
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

    // TODO: session 설정하고 main page로 redirect

    request.session.set("kakao", json);

    reply.redirect(308, "http://localhost:3000");
  } catch (error) {
    console.error((error as Error).message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}
