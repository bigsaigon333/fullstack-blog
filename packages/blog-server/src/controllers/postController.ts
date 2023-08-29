import { FastifyReply, FastifyRequest } from "fastify";
import { Post } from "../models/postModel.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../services/postService.js";
import { getErrorMessage } from "../utils/error.js";

// Get all posts
export const getAllPostsHandler = async (
  _: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const posts = await getAllPosts();
    reply.status(200).send(posts);
  } catch (error) {
    console.error(error);
    reply.status(500).send(getErrorMessage(error));
  }
};

// Get a specific post
export const getPostByIdHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const post = await getPost(id);

    if (!post) {
      reply.status(404).send();
      return;
    }

    reply.status(200).send(post);
  } catch (error) {
    console.error(error);
    reply.status(500).send(getErrorMessage(error));
  }
};

// Create a new post
export const createPostHandler = async (
  request: FastifyRequest<{ Body: { title: string } }>,
  reply: FastifyReply
) => {
  try {
    const { title } = request.body;
    const newPost = await createPost({ title, createdAt: Date.now() });
    reply.status(201).send(newPost);
  } catch (error) {
    console.error(error);
    reply.status(500).send(getErrorMessage(error));
  }
};

// Update a post
export const updatePostHandler = async (
  request: FastifyRequest<{ Params: { id: number }; Body: Partial<Post> }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const updates = request.body;
    const updatedPost = await updatePost(id, updates);

    if (!updatedPost) {
      reply.status(404).send();
      return;
    }

    reply.status(200).send(updatedPost);
  } catch (error) {
    console.error(error);
    reply.status(500).send(getErrorMessage(error));
  }
};

// Delete a post
export const deletePostHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const deletedPost = await deletePost(id);

    if (!deletedPost) {
      reply.status(404).send();
      return;
    }

    reply.status(204).send();
  } catch (error) {
    console.error(error);
    reply.status(500).send(getErrorMessage(error));
  }
};
