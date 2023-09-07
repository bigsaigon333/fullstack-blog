import Link from "../components/Link.js";
import PostListItem from "../components/PostListItem.js";
import usePosts from "../hooks/queries/usePosts.js";

const Posts = () => {
  const { data } = usePosts();

  return data.map((post) => (
    <Link key={post.id} to={`/posts/${post.id}`}>
      <PostListItem post={post} />
    </Link>
  ));
};

export default Posts;
