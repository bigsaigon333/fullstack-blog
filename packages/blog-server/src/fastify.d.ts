import "fastify";

declare module "fastify" {
  interface Session {
    kakao?: KakaoOAuthTokenResponse & { originDate: number };
  }
}
