import { FastifyInstance } from "fastify";
import {
  createPostContentsHandler,
  deletePostContentsHandler,
  getPostContentsByPostIdHandler,
  updatePostContentsHandler,
} from "../controllers/postContentController.js";

const postContentRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/post-contents/:postId", getPostContentsByPostIdHandler);
  fastify.post("/post-contents/:postId", createPostContentsHandler);
  fastify.patch("/post-contents/:postId", updatePostContentsHandler);
  fastify.delete("/post-contents/:postId", deletePostContentsHandler);
};

export default postContentRoutes;
