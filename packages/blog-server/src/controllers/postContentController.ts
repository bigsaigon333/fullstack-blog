import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPostContents,
  deletePostContents,
  getPostContentsByPostId,
  updatePostContents,
} from "../services/postContentService.js";
import { getErrorMessage } from "../utils/error.js";

// Get Post Contents by Post ID
export const getPostContentsByPostIdHandler = async (
  request: FastifyRequest<{ Params: { postId: number } }>,
  reply: FastifyReply
) => {
  const postId = Number(request.params.postId);

  try {
    const postContent = await getPostContentsByPostId(postId);

    if (postContent == null) {
      reply.status(404).send();
      return;
    }

    reply.status(200).send(postContent);
  } catch (error) {
    reply.status(500).send(getErrorMessage(error));
  }
};

// Create Post Contents
export const createPostContentsHandler = async (
  request: FastifyRequest<{
    Params: { postId: number };
    Body: { content: string };
  }>,
  reply: FastifyReply
) => {
  const postId = Number(request.params.postId);
  const { content } = request.body;

  try {
    const newPostContent = await createPostContents({ postId, content });

    reply.status(201).send(newPostContent);
  } catch (error) {
    console.error(error);

    reply.status(500).send(getErrorMessage(error));
  }
};

// Update Post Contents
export const updatePostContentsHandler = async (
  request: FastifyRequest<{
    Params: { postId: number };
    Body: { content: string };
  }>,
  reply: FastifyReply
) => {
  const postId = Number(request.params.postId);
  const { content } = request.body;

  try {
    const updatedPostContent = await updatePostContents({ postId, content });

    if (!updatedPostContent) {
      reply.status(404).send();
      return;
    }

    reply.status(200).send(updatedPostContent);
  } catch (error) {
    console.error(error);

    reply.status(500).send(getErrorMessage(error));
  }
};

// Delete Post Contents
export const deletePostContentsHandler = async (
  request: FastifyRequest<{ Params: { postId: number } }>,
  reply: FastifyReply
) => {
  const postId = Number(request.params.postId);

  try {
    const deletedPostContent = await deletePostContents({ postId });

    if (!deletedPostContent) {
      reply.status(404).send();
      return;
    }

    reply.status(204).send();
  } catch (error) {
    console.error(error);

    reply.status(500).send(getErrorMessage(error));
  }
};
