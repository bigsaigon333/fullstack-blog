import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Post, PostResponse } from "../../models/post.js";
import { craetePost } from "../../remotes/posts.js";

export type FormPayload = { title: string; content: string };

const useCreatePost = (
  options?: Omit<
    UseMutationOptions<Post, Error, FormPayload, unknown>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    mutationKey: ["post"],
    mutationFn: (payload: FormPayload) => craetePost(payload),
    ...options,
  });
};

export default useCreatePost;
