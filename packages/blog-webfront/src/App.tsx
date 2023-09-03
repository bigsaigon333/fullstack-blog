import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import PostsPage from "./pages/PostsPage.js";
import { globalQueryClient } from "./utils/reactQuery.js";

import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";

import Container from "./components/Container.js";
import "./main.css";
import PostContentPage from "./pages/PostContentPage.js";

const App = () => {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <Container>
                  <Link to="/">
                    <Header title="프론트엔드 개발자 김동희입니다" />
                  </Link>
                  <Outlet />
                </Container>
              }
            >
              <Route path="/" element={<PostsPage />} />
              <Route path="/posts/:id" element={<PostContentPage />} />

              {/* TODO: 404 page */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
