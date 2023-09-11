import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../remotes/posts.js";

const usePosts = () => {
  return useSuspenseQuery({
    queryKey: usePosts.getQueryKey(),
    queryFn: fetchPosts,
  });
};

usePosts.getQueryKey = () => ["post"];

export default usePosts;
