import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo } from "react";
import usePostContent from "../hooks/queries/usePostContent.js";

type Props = {
  postId: number;
};

const PostContent = ({ postId }: Props) => {
  const {
    data: { content },
  } = usePostContent({ id: postId });

  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(content)),
    [content]
  );

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default PostContent;
