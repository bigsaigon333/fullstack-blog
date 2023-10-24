import { Button } from "flowbite-react";
import { Suspense, startTransition } from "react";
import { useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Authorized from "../components/Authorized.js";
import PostContent from "../components/PostContent.js";
import PostListItem from "../components/PostListItem.js";
import useDeletePost from "../hooks/mutation/useDeletePost.js";
import usePost from "../hooks/queries/usePost.js";
import usePosts from "../hooks/queries/usePosts.js";

const PostContentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !Number.isNaN(value))
    .parse(id);

  const { data: post } = usePost({ id: postId });
  const { mutate: deletePost } = useDeletePost({
    onSuccess: async () => {
      await usePosts.refetch();
      navigate("/");
    },
  });

  const toEditPage = `/posts/${postId}/edit`;
  const handleClick = useLinkClickHandler(toEditPage);

  return (
    <>
      <PostListItem {...post} />

      <hr className="my-4" />

      <PostContent postId={postId} />

      <hr className="mb-4 mt-24" />
      <div className="flex justify-end gap-x-4">
        <Suspense>
          <Authorized expectedRole="admin" fallback={null}>
            <Button
              color="failure"
              onClick={() => {
                const confirmed = window.confirm("정말 삭제하시겠습니까?");
                if (confirmed) {
                  deletePost(postId);
                }
              }}
            >
              Delete
            </Button>
            <Button
              as="a"
              href={toEditPage}
              onClick={(event) => startTransition(() => handleClick(event))}
            >
              Edit
            </Button>
          </Authorized>
        </Suspense>
      </div>
    </>
  );
};

export default PostContentPage;
