import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { deserialize } from "superjson";
import App from "./App.js";
import { Html } from "./common.js";
import { defaultOptions } from "./utils/reactQuery.js";

const queryClient = new QueryClient({ defaultOptions });

if (window.__REACT_QUERY_STATE__) {
  hydrate(queryClient, deserialize(window.__REACT_QUERY_STATE__));
}

hydrateRoot(
  document.getElementById("app")!,
  <Main assetMap={window.__ASSET_MAP__} />
);

type Props = {
  assetMap: { js: string[]; css: string[] };
};

function Main({ assetMap }: Props) {
  return (
    <Html assetMap={assetMap}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Html>
  );
}
