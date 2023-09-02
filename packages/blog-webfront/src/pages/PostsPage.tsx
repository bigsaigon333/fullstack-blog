import PostListItem from "../components/PostListItem.js";
import usePosts from "../hooks/queries/usePosts.js";

const Posts = () => {
  const { data } = usePosts();

  return data.map((post) => <PostListItem key={post.id} post={post} />);
};

export default Posts;
