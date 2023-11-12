import queryString from "query-string";
import { z } from "zod";
import { Pagination } from "../models/pagination.js";
import { Post, PostContent, PostResponse } from "../models/post.js";
import { RemoteOptions, http } from "../utils/network.js";

type FetchPostsParams = {
  page?: number;
  size?: number;
  q?: string;
};

export const DEFAULT_PAGE_SIZE = 10;

export const fetchPosts = async (
  params: FetchPostsParams = {},
  { httpClient = http, signal }: RemoteOptions = {}
): Promise<Pagination<Post>> => {
  const json = await httpClient
    .get(
      `api/posts?${queryString.stringify(
        { size: DEFAULT_PAGE_SIZE, ...params },
        { skipEmptyString: true }
      )}`,
      { signal }
    )
    .json<PostResponse>();
  const parsedJson = PostResponse.parse(json);

  return z.object({ total: z.number(), data: z.array(Post) }).parse(parsedJson);
};

export const fetchPost = async (
  { id }: { id: number },
  { httpClient = http, signal }: RemoteOptions = {}
): Promise<Post> => {
  const json = await httpClient
    .get(`api/posts/${id}`, { signal })
    .json<PostResponse>();

  return Post.parse(json);
};

export const fetchPostContent = async (
  { id }: { id: number },
  { httpClient = http, signal }: RemoteOptions = {}
): Promise<PostContent> => {
  const json = await httpClient
    .get(`api/posts/${id}/content`, { signal })
    .json<PostResponse>();

  return PostContent.parse(json);
};

export const craetePost = async (
  payload: {
    title: string;
    content: string;
  },
  { httpClient = http, signal }: RemoteOptions = {}
) => {
  const json = await httpClient
    .post(`api/posts`, { json: payload, signal })
    .json<Post>();

  return json;
};

export const deletePost = async (
  id: number,
  { httpClient = http, signal }: RemoteOptions = {}
) => {
  await httpClient.delete(`api/posts/${id}`, {
    headers: { "Content-Type": undefined },
    signal,
  });
};
