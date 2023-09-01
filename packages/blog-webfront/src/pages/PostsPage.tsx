import usePosts from "../hooks/queries/usePosts.js";

const Posts = () => {
  const { data } = usePosts();

  return <div>Hello, World! {data.length}</div>;
};

export default Posts;
