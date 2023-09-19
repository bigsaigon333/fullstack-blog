import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPost } from "../../remotes/posts.js";

const usePost = ({ id }: { id: number }) => {
  return useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost({ id }),
  });
};

export default usePost;
