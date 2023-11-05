import dayjs, { Dayjs, isDayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { Spinner } from "flowbite-react";
import queryString from "query-string";
import { StrictMode, Suspense } from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { registerCustom } from "superjson";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import Authorized from "./components/Authorized.js";
import Container from "./components/Container.js";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import EditPage from "./pages/EditPage.js";
import PostContentPage from "./pages/PostContentPage.js";
import PostsPage from "./pages/PostsPage.js";

import "dayjs/esm/locale/ko";
import "./main.css";

registerCustom<Dayjs, string>(
  {
    isApplicable: (v): v is Dayjs => isDayjs(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => dayjs(v),
  },
  "dayjs"
);

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const App = () => {
  return (
    <StrictMode>
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: queryString.parse,
          objectToSearchString: queryString.stringify,
        }}
      >
        <Suspense fallback={null}>
          <Routes>
            <Route
              element={
                <Container>
                  <Navbar />
                  <Link to="/">
                    <Header title="프론트엔드 개발자 김동희입니다" />
                  </Link>
                  <Suspense fallback={<Spinner />}>
                    <Outlet />
                  </Suspense>
                </Container>
              }
            >
              <Route path="/" element={<PostsPage />} />
              <Route path="/posts/:id" element={<PostContentPage />} />
              <Route
                path="/edit"
                element={
                  <Suspense>
                    <Authorized
                      expectedRole="admin"
                      fallback={<Navigate to="/" replace />}
                    >
                      <EditPage />
                    </Authorized>
                  </Suspense>
                }
              />
              {/* TODO: 404 page */}
            </Route>
          </Routes>
        </Suspense>
      </QueryParamProvider>
    </StrictMode>
  );
};

export default App;
