import { Post } from "../models/post.js";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  return (
    <article className="flex flex-col gap-y-2">
        <h2 className="text-xl md:text-2xl font-medium">{post.title}</h2>
      <p className="self-end text-sm">
        <span>{"최종 수정 시간: "}</span>
        <time dateTime={post.lastUpdatedAt.toISOString()}>
          {post.lastUpdatedAt.format("YYYY-MM-DD HH:MM:ssZ")}
        </time>
      </p>
    </article>
  );
};

export default PostListItem;
