import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../remotes/posts.js";

const usePosts = () => {
  return useSuspenseQuery({ queryKey: ["post"], queryFn: fetchPosts });
};

export default usePosts;
