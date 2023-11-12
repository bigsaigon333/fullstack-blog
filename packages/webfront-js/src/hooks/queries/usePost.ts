import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPost } from "../../remotes/posts.js";
import useHttpClient from "../useHttpClient.js";

const usePostQuery = ({ id }: { id: number }) => {
  const httpClient = useHttpClient();

  return useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost({ id }, { httpClient }),
  });
};

const usePost = ({ id }: { id: number }) => {
  return usePostQuery({ id }).data;
};

export default usePost;
