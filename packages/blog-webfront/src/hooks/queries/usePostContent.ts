import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPostContent } from "../../remotes/posts.js";
import useHttpClient from "../useHttpClient.js";

const usePostContentQuery = ({ id }: { id: number }) => {
  const httpClient = useHttpClient();

  return useSuspenseQuery({
    queryKey: ["post", "content", id],
    queryFn: () => fetchPostContent({ id }, { httpClient }),
  });
};

const usePostContent = ({ id }: { id: number }) => {
  return usePostContentQuery({ id }).data;
};

export default usePostContent;
