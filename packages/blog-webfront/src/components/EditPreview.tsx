import dayjs from "dayjs";
import MarkdownRenderer from "./MarkdownRenderer.js";
import PostListItem from "./PostListItem.js";
import useCreatePost from "../hooks/mutation/useCreatePost.js";
import { FormEventHandler } from "react";
import { Button, Spinner } from "flowbite-react";

export type EditPreviewProps = { title: string; content: string };

export const EditPreview = (data: EditPreviewProps) => {
  const { mutate, isPending } = useCreatePost();
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PostListItem title={data.title} lastUpdatedAt={dayjs()} />
      <hr className="my-4" />
      <MarkdownRenderer content={data.content} />

      <div className="flex justify-end gap-x-2 mt-12">
        <Button
          type="submit"
          color="failure"
          isProcessing={isPending}
          processingSpinner={<Spinner color="failure" />}
        >
          Publish Post
        </Button>
      </div>
    </form>
  );
};
