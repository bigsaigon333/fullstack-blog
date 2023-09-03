import { z } from "zod";
import { Post, PostContent, PostResponse } from "../models/post.js";
import { http } from "../utils/network.js";

export const fetchPosts = async (): Promise<Post[]> => {
  const json = await http.get("/api/posts").json<PostResponse[]>();

  return z.array(Post).parse(json);
};

export const fetchPost = async ({ id }: { id: number }): Promise<Post> => {
  const json = await http.get(`/api/posts/${id}`).json<PostResponse>();

  return Post.parse(json);
};

export const fetchPostContent = async ({
  id,
}: {
  id: number;
}): Promise<PostContent> => {
  const json = await http.get(`/api/posts/${id}/content`).json<PostResponse>();

  return PostContent.parse(json);
};
