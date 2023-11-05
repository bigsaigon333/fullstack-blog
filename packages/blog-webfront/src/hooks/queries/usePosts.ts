import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Pagination } from "../../models/pagination.js";
import { Post } from "../../models/post.js";
import { fetchPosts } from "../../remotes/posts.js";
import useHttpClient from "../useHttpClient.js";

type UsePostsParams = {
  page?: number;
  size?: number;
  q?: string;
};

type UsePostsOptions = Omit<
  UseSuspenseQueryOptions<Pagination<Post>>,
  "queryKey" | "queryFn"
>;

export const usePosts = (
  params: UsePostsParams = {},
  options?: UsePostsOptions
) => {
  return usePostsQuery(params, options).data;
};

export const usePostsQuery = (
  params: UsePostsParams = {},
  options?: UsePostsOptions
) => {
  const httpClient = useHttpClient();

  return useSuspenseQuery({
    queryKey: usePosts.getQueryKey(params),
    queryFn: () => fetchPosts(params, { httpClient }),
    ...options,
  });
};

usePosts.getQueryKey = (params: UsePostsParams = {}) => [
  "posts",
  ...Object.values(params),
];

export default usePosts;
