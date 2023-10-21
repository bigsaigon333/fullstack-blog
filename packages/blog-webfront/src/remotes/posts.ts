import { z } from "zod";
import { Pagination } from "../models/pagination.js";
import { Post, PostContent, PostResponse } from "../models/post.js";
import { http } from "../utils/network.js";
import queryString from "query-string";

type FetchPostsParams = {
  page?: number;
  size?: number;
  q?: string;
};

export const DEFAULT_PAGE_SIZE = 10;

export const fetchPosts = async (
  params: FetchPostsParams = {}
): Promise<Pagination<Post>> => {
  const json = await http
    .get(
      `api/posts?${queryString.stringify(
        { size: DEFAULT_PAGE_SIZE, ...params },
        { skipEmptyString: true }
      )}`
    )
    .json<PostResponse>();
  const parsedJson = PostResponse.parse(json);

  return z.object({ total: z.number(), data: z.array(Post) }).parse(parsedJson);
};

export const fetchPost = async ({ id }: { id: number }): Promise<Post> => {
  const json = await http.get(`api/posts/${id}`).json<PostResponse>();

  return Post.parse(json);
};

export const fetchPostContent = async ({
  id,
}: {
  id: number;
}): Promise<PostContent> => {
  const json = await http.get(`api/posts/${id}/content`).json<PostResponse>();

  return PostContent.parse(json);
};

export const craetePost = async (payload: {
  title: string;
  content: string;
}) => {
  const json = await http.post(`api/posts`, { json: payload }).json<Post>();

  return json;
};

export const deletePost = async (id: number) => {
  await http.delete(`api/posts/${id}`, {
    headers: { "Content-Type": undefined },
  });
};
