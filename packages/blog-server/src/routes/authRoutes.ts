import { FastifyInstance } from "fastify";
import { getKakaoOauthToken } from "../controllers/authController.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/kakao/authorize", getKakaoOauthToken);
}
