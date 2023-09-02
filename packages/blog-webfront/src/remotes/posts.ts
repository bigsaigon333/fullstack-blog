import { z } from "zod";
import { Post, PostResponse } from "../models/post.js";
import { http } from "../utils/network.js";

export const fetchPosts = async (): Promise<Post[]> => {
  const json = await http.get("/api/posts").json<PostResponse[]>();

  return z.array(Post).parse(json);
};
