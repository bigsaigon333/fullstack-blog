import Container from "../components/Container.js";
import PostListItem from "../components/PostListItem.js";
import Header from "../components/Header.js";
import usePosts from "../hooks/queries/usePosts.js";

const Posts = () => {
  const { data } = usePosts();

  return (
    <Container>
      <Header title="프론트엔드 개발자 김동희입니다" />

      {data.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
