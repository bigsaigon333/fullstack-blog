import { Post } from "../models/post.js";
import { http } from "../utils/network.js";

export const fetchPosts = async () => {
  return http.get("/api/posts").json<Post[]>();
};
