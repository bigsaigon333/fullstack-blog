import dayjs from "dayjs";
import MarkdownRenderer from "./MarkdownRenderer.js";
import PostListItem from "./PostListItem.js";
import useCreatePost from "../hooks/mutation/useCreatePost.js";
import { FormEventHandler } from "react";

export type EditPreviewProps = { title: string; content: string };

export const EditPreview = (data: EditPreviewProps) => {
  const { mutate } = useCreatePost();
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
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 h-[42px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Publish Post
        </button>
      </div>
    </form>
  );
};
