import "fastify";
import type { KakaoOAuthTokenResponse } from "./controllers/authController.js";

declare module "fastify" {
  interface Session {
    kakao?: KakaoOAuthTokenResponse & { originDate: number };
  }
}
