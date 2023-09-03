import { Marked, marked } from "marked";
import usePostContent from "../hooks/queries/usePostContent.js";
import DOMPurify from "dompurify";

type Props = {
  postId: number;
};

const PostContent = ({ postId }: Props) => {
  const {
    data: { content },
  } = usePostContent({ id: postId });

  const html = DOMPurify.sanitize(marked.parse(content));

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default PostContent;
