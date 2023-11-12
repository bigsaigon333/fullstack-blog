import usePostContent from "../hooks/queries/usePostContent.js";
import MarkdownRenderer from "./MarkdownRenderer.js";

type Props = {
  postId: number;
};

const PostContent = ({ postId }: Props) => {
  const { content } = usePostContent({ id: postId });

  return <MarkdownRenderer content={content} />;
};

export default PostContent;
