import "fastify";
import type { KakaoOAuthTokenResponse } from "./services/kakaoService.js";

type KakaoSession = KakaoOAuthTokenResponse & {
  lastUpdatedAt: number;
};

declare module "fastify" {
  interface Session {
    kakao?: KakaoSession;
  }
}
