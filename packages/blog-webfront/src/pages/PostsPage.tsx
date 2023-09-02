import Container from "../components/Container.js";
import Header from "../components/header.js";
import usePosts from "../hooks/queries/usePosts.js";

const Posts = () => {
  const { data } = usePosts();

  return (
    <Container>
      <Header title="프론트엔드 개발자 김동희입니다" />

      <div>Hello, World! {data.length}</div>
    </Container>
  );
};

export default Posts;
