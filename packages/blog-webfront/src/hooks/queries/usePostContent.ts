import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPostContent } from "../../remotes/posts.js";

const usePostContent = ({ id }: { id: number }) => {
  return useSuspenseQuery({
    queryKey: ["post", "content", id],
    queryFn: () => fetchPostContent({ id }),
  });
};

export default usePostContent;
