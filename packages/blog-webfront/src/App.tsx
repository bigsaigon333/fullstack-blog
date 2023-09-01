import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import PostsPage from "./pages/PostsPage.js";
import { globalQueryClient } from "./utils/reactQuery.js";

import "./main.css";

const App = () => {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <Suspense fallback={null}>
        <PostsPage />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
