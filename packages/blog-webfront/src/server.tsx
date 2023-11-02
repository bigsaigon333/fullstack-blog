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
};

export function makeRenderContext(
  { url, cookie }: RenderParams,
  options?: RenderToPipeableStreamOptions
) {
  const httpClient = http.extend({ headers: { cookie } });
  const queryClient = new QueryClient({ defaultOptions });

  const render = (options?: RenderToPipeableStreamOptions) =>
    renderToPipeableStream(
      <Main url={url} httpClient={httpClient} queryClient={queryClient} />,
      options
    );

  const dehydrate = (options?: DehydrateOptions) =>
    `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(
      serialize(dehydrateQueryClient(queryClient, options))
    )}</script>`;

  return {
    render,
    dehydrate,
  };
}

type Props = {
  url: string;
  httpClient: typeof http;
  queryClient: QueryClient;
};

function Main({ url, httpClient, queryClient }: Props) {
  return (
    <Html>
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
