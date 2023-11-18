import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Button } from "flowbite-react";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreatePost from "../hooks/mutation/useCreatePost.js";
import useSaveDraft from "../hooks/useSaveDraft.js";
import MarkdownRenderer from "./MarkdownRenderer.js";
import PostListItem from "./PostListItem.js";
import PublishConfirmModal from "./PublishConfirmModal.js";

export type EditPreviewProps = { title: string; content: string };

export const EditPreview = (data: EditPreviewProps) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [, , clearDraft] = useSaveDraft();
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreatePost({
    onSuccess: async (data) => {
      window.alert("아티클 게시에 성공하였습니다!");
      clearDraft();
      setShowModal(false);

      await queryClient.refetchQueries({
        queryKey: ["posts"],
        exact: false,
      });
      navigate(`/posts/${data.id}`);
    },
    onError: (error) => {
      setShowModal(false);
      window.alert(error.message);
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PostListItem title={data.title} lastUpdatedAt={dayjs()} />
      <hr className="my-4" />
      <MarkdownRenderer content={data.content} />

      <div className="flex justify-end gap-x-2 mt-12">
        <Button type="submit" color="failure">
          Publish Post
        </Button>
      </div>
      <PublishConfirmModal
        open={showModal}
        onOpenChange={setShowModal}
        onConfirm={() => mutateAsync(data)}
      />
    </form>
  );
};
