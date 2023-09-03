import usePostContent from "../hooks/queries/usePostContent.js";

type Props = {
  postId: number;
};

const PostContent = ({ postId }: Props) => {
  const {
    data: { content },
  } = usePostContent({ id: postId });

  return <div>{content}</div>;
};

export default PostContent;
