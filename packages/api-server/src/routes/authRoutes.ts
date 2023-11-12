import { FastifyInstance } from "fastify";
import {
  getKakaoOAuthToken,
  getMyProfile,
  logout,
} from "../controllers/authController.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/kakao/authorize", getKakaoOAuthToken);
  fastify.get("/my-profile", getMyProfile);
  fastify.post("/logout", logout);
}
