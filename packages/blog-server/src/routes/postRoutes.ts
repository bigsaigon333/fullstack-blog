import { FastifyInstance } from "fastify";
import {
  getAllPostsHandler,
  getPostByIdHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostContentsByIdHandler,
} from "../controllers/postController.js";

const postRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/posts", getAllPostsHandler);
  fastify.get("/posts/:id", getPostByIdHandler);
  fastify.get("/posts/:id/content", getPostContentsByIdHandler);
  fastify.post("/posts", createPostHandler);
  fastify.patch("/posts/:id", updatePostHandler);
  fastify.delete("/posts/:id", deletePostHandler);
};

export default postRoutes;
