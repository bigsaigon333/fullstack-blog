import { useMutation } from "@tanstack/react-query";
import { craetePost } from "../../remotes/posts.js";

export type FormPayload = { title: string; content: string };

const useCreatePost = () => {
  return useMutation({
    mutationKey: ["post"],
    mutationFn: (payload: FormPayload) => craetePost(payload),
  });
};

export default useCreatePost;
