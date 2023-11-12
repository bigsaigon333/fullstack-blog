import "fastify";
import type { KakaoOAuthTokenResponse } from "../services/kakaoService.ts";

type KakaoSession = KakaoOAuthTokenResponse & {
  lastUpdatedAt: number;
};

declare module "fastify" {
  interface Session {
    kakao?: KakaoSession;
  }
}
