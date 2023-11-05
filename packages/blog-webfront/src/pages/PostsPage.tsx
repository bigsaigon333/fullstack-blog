import { Pagination } from "flowbite-react";
import { startTransition } from "react";
import { TiBackspaceOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import {
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import PostListItem from "../components/PostListItem.js";
import usePosts from "../hooks/queries/usePosts.js";
import { DEFAULT_PAGE_SIZE } from "../remotes/posts.js";

const Posts = () => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [q, setQ] = useQueryParam("q", withDefault(StringParam, ""));

  const { data, total } = usePosts({ page, q });

  const totalPages = Math.ceil(total / DEFAULT_PAGE_SIZE);

  return (
    <>
      {q && (
        <div className="mb-10 flex justify-between">
          <p className="text-xl">
            <strong>{q}</strong>에 대한 검색 결과는 총 {total}건이에요
          </p>
          <button
            className="p-1"
            onClick={() => startTransition(() => (setQ(""), setPage(1)))}
          >
            <TiBackspaceOutline className="w-5 h-5" />
            <span className="sr-only">초기화</span>
          </button>
        </div>
      )}

      {data.length > 0 ? (
        <>
          {data.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <PostListItem {...post} />
            </Link>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center mt-20">
              <Pagination
                currentPage={page}
                onPageChange={(nextPage) =>
                  startTransition(() => setPage(nextPage))
                }
                layout="navigation"
                nextLabel="Next"
                previousLabel="Prev"
                showIcons
                totalPages={totalPages}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default Posts;
