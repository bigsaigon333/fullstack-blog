import { FetchInterceptor } from "@mswjs/interceptors/fetch";
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
import { defaultOptions } from "./utils/reactQuery.js";

type RenderParams = {
  url: string;
  cookie: string | undefined;
};

export function render(
  { url, cookie }: RenderParams,
  options?: RenderToPipeableStreamOptions
): PipeableStream {
  const interceptor = new FetchInterceptor();
  interceptor.apply();
  interceptor.on("request", ({ request, requestId }) => {
    if (cookie) {
      request.headers.set("cookie", cookie);
    }
  });

  return renderToPipeableStream(<Main url={url} />, options);
}

type Props = {
  url: string;
};

function Main({ url }: Props) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return (
    <Html>
      <StaticRouter location={url}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StaticRouter>
    </Html>
  );
}
