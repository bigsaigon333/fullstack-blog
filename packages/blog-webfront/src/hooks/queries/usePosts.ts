import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Pagination } from "../../models/pagination.js";
import { Post } from "../../models/post.js";
import { fetchPosts } from "../../remotes/posts.js";
import { globalQueryClient } from "../../utils/reactQuery.js";

type UsePostsParams = {
  page?: number;
  size?: number;
  q?: string;
};

type UsePostsOptions = Omit<
  UseSuspenseQueryOptions<Pagination<Post>>,
  "queryKey" | "queryFn"
>;

const usePosts = (params: UsePostsParams = {}, options?: UsePostsOptions) => {
  return useSuspenseQuery({
    queryKey: usePosts.getQueryKey(params),
    queryFn: () => fetchPosts(params),
    ...options,
  });
};

usePosts.getQueryKey = (params: UsePostsParams) => [
  "posts",
  ...Object.values(params),
];

usePosts.invalidate = (params: UsePostsParams = {}) => {
  globalQueryClient.invalidateQueries({
    queryKey: usePosts.getQueryKey(params),
    exact: false,
  });
};

usePosts.refetch = async (params: UsePostsParams = {}) => {
  return globalQueryClient.refetchQueries({
    queryKey: usePosts.getQueryKey(params),
    exact: false,
  });
};

export default usePosts;
