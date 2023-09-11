import dayjs from "dayjs";
import { Button, Modal, Spinner } from "flowbite-react";
import { FormEventHandler, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import useCreatePost from "../hooks/mutation/useCreatePost.js";
import usePosts from "../hooks/queries/usePosts.js";
import { useDialog } from "../hooks/useDialog.js";
import MarkdownRenderer from "./MarkdownRenderer.js";
import PostListItem from "./PostListItem.js";
import useSaveDraft from "../hooks/useSaveDraft.js";
import { useQueryClient } from "@tanstack/react-query";

export type EditPreviewProps = { title: string; content: string };

export const EditPreview = (data: EditPreviewProps) => {
  const navigate = useNavigate();
  const publishConfirm = useDialog();
  const [, , clearDraft] = useSaveDraft();
  const queryClient = useQueryClient();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    publishConfirm.open(({ open, onOpenChange }) => {
      const onClose = () => onOpenChange(false);
      const { mutate, isPending } = useCreatePost({
        onSuccess: (data) => {
          window.alert("아티클 게시에 성공하였습니다!");
          onClose();
          startTransition(() => {
            queryClient.refetchQueries({
              queryKey: usePosts.getQueryKey(),
              exact: true,
            });

            clearDraft();
            navigate(`/posts/${data.id}`);
          });
        },
        onError: (error) => {
          onClose();
          window.alert(error.message);
        },
      });

      return (
        <Modal
          size="md"
          popup
          show={open}
          onClose={isPending ? undefined : onClose}
          dismissible={!isPending}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                정말로 아티클을 게시하시겠습니까?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={onClose} disabled={isPending}>
                  아니오, 취소하겠습니다
                </Button>
                <Button
                  color="failure"
                  isProcessing={isPending}
                  processingSpinner={<Spinner color="failure" />}
                  onClick={() => mutate(data)}
                >
                  네, 게시하겠습니다
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
    });
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
    </form>
  );
};
