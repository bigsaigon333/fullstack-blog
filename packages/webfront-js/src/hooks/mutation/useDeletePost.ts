import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { deletePost } from "../../remotes/posts.js";

const useCreatePost = (
  options?: Omit<
    UseMutationOptions<void, Error, number, unknown>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    mutationKey: ["post-delete"],
    mutationFn: deletePost,
    ...options,
  });
};

export default useCreatePost;
