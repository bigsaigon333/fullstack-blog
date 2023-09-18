import { FastifyReply, FastifyRequest } from "fastify";
import { Post } from "../models/postModel.js";
import {
  createPost,
  deletePost,
  getPosts,
  getPost,
  getPostContent,
  updatePost,
  getPostsCount,
} from "../services/postService.js";
import { getErrorMessage } from "../utils/error.js";
import { DEFAULT_PAGINATION_SIZE } from "../utils/constants.js";

// Get paginated posts
export const getPaginatedPostsHandler = async (
  request: FastifyRequest<{
    Querystring: { page: string; size: string; q?: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const page = Number(request.query.page) || 1;
    const size = Number(request.query.size) || DEFAULT_PAGINATION_SIZE;
    const q = request.query.q;
    const data = await getPosts({ page, size, q });
    const total = await getPostsCount({ q });
    reply.status(200).send({ data, total });
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

    if (post == null) {
      reply.status(404).send();
      return;
    }

    reply.status(200).send(post);
  } catch (error) {
    console.error(error);
    reply.status(500).send(getErrorMessage(error));
  }
};

export const getPostContentsByIdHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);

  try {
    const postContent = await getPostContent(id);

    if (postContent == null) {
      reply.status(404).send();
      return;
    }

    reply.status(200).send(postContent);
  } catch (error) {
    reply.status(500).send(getErrorMessage(error));
  }
};

// Create a new post
export const createPostHandler = async (
  request: FastifyRequest<{ Body: { title: string; content: string } }>,
  reply: FastifyReply
) => {
  const { title, content } = request.body;

  try {
    const newPost = await createPost({ title, createdAt: Date.now(), content });

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
  const id = Number(request.params.id);
  const updates = request.body;

  try {
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
  const id = Number(request.params.id);

  try {
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
