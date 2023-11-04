import { QueryClientProvider, hydrate } from "@tanstack/react-query";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { deserialize } from "superjson";
import App from "./App.js";
import { Html } from "./common.js";
import { globalQueryClient } from "./utils/reactQuery.js";

if (window.__REACT_QUERY_STATE__) {
  hydrate(globalQueryClient, deserialize(window.__REACT_QUERY_STATE__));
}

hydrateRoot(document.getElementById("app")!, <Main />);

function Main() {
  return (
    <Html>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <QueryClientProvider client={globalQueryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Html>
  );
}
