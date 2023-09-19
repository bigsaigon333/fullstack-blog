import { Pagination } from "flowbite-react";
import { startTransition } from "react";
import { NumberParam, useQueryParam } from "use-query-params";
import Link from "../components/Link.js";
import PostListItem from "../components/PostListItem.js";
import usePosts from "../hooks/queries/usePosts.js";
import { DEFAULT_PAGE_SIZE } from "../remotes/posts.js";

const Posts = () => {
  const [_page, setPage] = useQueryParam("page", NumberParam);
  const page = _page || 1;

  const {
    data: { data, total },
  } = usePosts({ page });

  const totalPages = Math.ceil(total / DEFAULT_PAGE_SIZE);

  return (
    <>
      {data.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <PostListItem {...post} />
        </Link>
      ))}

      <div className="flex justify-center mt-20">
        <Pagination
          currentPage={page}
          onPageChange={(nextPage) => startTransition(() => setPage(nextPage))}
          layout="navigation"
          nextLabel="Next"
          previousLabel="Prev"
          showIcons
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Posts;
