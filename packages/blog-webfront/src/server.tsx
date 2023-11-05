import {
  DehydrateOptions,
  QueryClient,
  QueryClientProvider,
  dehydrate as dehydrateQueryClient,
} from "@tanstack/react-query";
import {
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { serialize } from "superjson";
import App from "./App.js";
import { Html } from "./common.js";
import { HttpClientProvider } from "./hooks/useHttpClient.js";
import { http } from "./utils/network.js";
import { defaultOptions } from "./utils/reactQuery.js";

type RenderParams = {
  url: string;
  cookie: string | undefined;
  assetMap: { js: string[]; css: string[] };
};

export function makeRenderContext(
  { url, cookie, assetMap }: RenderParams,
  options?: RenderToPipeableStreamOptions
) {
  const httpClient = http.extend({ headers: { cookie } });
  const queryClient = new QueryClient({ defaultOptions });

  const render = (options?: RenderToPipeableStreamOptions) =>
    renderToPipeableStream(
      <Main
        url={url}
        httpClient={httpClient}
        queryClient={queryClient}
        assetMap={assetMap}
      />,
      options
    );

  const dehydrate = (options?: DehydrateOptions) => /* html */ `
    <script>
      window.__REACT_QUERY_STATE__ = ${JSON.stringify(
        serialize(dehydrateQueryClient(queryClient, options))
      )};
      window.__ASSET_MAP__ = ${JSON.stringify(assetMap)};
    </script>`;

  return {
    render,
    dehydrate,
  };
}

type Props = {
  url: string;
  httpClient: typeof http;
  queryClient: QueryClient;
  assetMap: { js: string[]; css: string[] };
};

function Main({ url, httpClient, queryClient, assetMap }: Props) {
  return (
    <Html assetMap={assetMap}>
      <HttpClientProvider value={httpClient}>
        <StaticRouter location={url}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StaticRouter>
      </HttpClientProvider>
    </Html>
  );
}
