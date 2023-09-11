import { Button } from "flowbite-react";
import { startTransition } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";
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

  const toEditPage = `/posts/${postId}/edit`;
  const handleClick = useLinkClickHandler(toEditPage);

  return (
    <>
      <PostListItem {...post} />

      <hr className="my-4" />

      <PostContent postId={postId} />

      <hr className="mb-4 mt-24" />
      <div className="flex justify-end">
        <Button
          as="a"
          href={toEditPage}
          onClick={(event) => startTransition(() => handleClick(event))}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default PostContentPage;
