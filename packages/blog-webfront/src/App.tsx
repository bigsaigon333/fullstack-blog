import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Container from "./components/Container.js";
import Header from "./components/Header.js";
import Link from "./components/Link.js";
import Navbar from "./components/Navbar.js";
import { DialogProvider } from "./hooks/useDialog.js";
import EditPage from "./pages/EditPage.js";
import PostContentPage from "./pages/PostContentPage.js";
import PostsPage from "./pages/PostsPage.js";
import { globalQueryClient } from "./utils/reactQuery.js";

import "./main.css";

const App = () => {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <DialogProvider>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <Container>
                    <Navbar />
                    <Link to="/">
                      <Header title="프론트엔드 개발자 김동희입니다" />
                    </Link>
                    <Suspense>
                      <Outlet />
                    </Suspense>
                  </Container>
                }
              >
                <Route path="/" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostContentPage />} />
                <Route path="/edit" element={<EditPage />} />
                {/* TODO: 404 page */}
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </DialogProvider>
    </QueryClientProvider>
  );
};

export default App;
