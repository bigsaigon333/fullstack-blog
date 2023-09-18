import { z } from "zod";
import { Pagination } from "../models/pagination.js";
import { Post, PostContent, PostResponse } from "../models/post.js";
import { http } from "../utils/network.js";

export const fetchPosts = async (): Promise<Pagination<Post>> => {
  const json = await http.get("/api/posts").json<PostResponse>();
  const parsedJson = PostResponse.parse(json);

  return z.object({ total: z.number(), data: z.array(Post) }).parse(parsedJson);
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

export const craetePost = async (payload: {
  title: string;
  content: string;
}) => {
  const json = await http
    .post(`/api/posts`, { json: payload })
    .json<PostResponse>();

  return json;
};
