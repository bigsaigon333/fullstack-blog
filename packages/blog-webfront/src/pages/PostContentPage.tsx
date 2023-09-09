import { useParams } from "react-router-dom";
import { z } from "zod";
import PostContent from "../components/PostContent.js";
import PostListItem from "../components/PostListItem.js";
import usePost from "../hooks/queries/usePost.js";

const PostContentPage = () => {
  const { id } = useParams();
  const postId = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !Number.isNaN(value))
    .parse(id);

  const { data: post } = usePost({ id: postId });

  return (
    <>
      <PostListItem {...post} />

      <hr className="my-4" />

      <PostContent postId={postId} />
    </>
  );
};

export default PostContentPage;
