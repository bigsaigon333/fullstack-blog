import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
  PipeableStream,
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./App.js";
import { Html } from "./common.js";
import { HttpClientProvider } from "./hooks/useHttpClient.js";
import { http } from "./utils/network.js";
import { defaultOptions } from "./utils/reactQuery.js";

type RenderParams = {
  url: string;
  cookie: string | undefined;
};

export function render(
  { url, cookie }: RenderParams,
  options?: RenderToPipeableStreamOptions
): PipeableStream {
  const client = http.extend({ headers: { cookie } });

  return renderToPipeableStream(
    <Main url={url} httpClient={client} />,
    options
  );
}

type Props = {
  url: string;
  httpClient: typeof http;
};

function Main({ url, httpClient }: Props) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

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
