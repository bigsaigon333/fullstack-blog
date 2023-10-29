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
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/public/main.css" rel="stylesheet" />
        <title>Document</title>
      </head>
      <body>
        <div id="app">
          <StaticRouter location={url}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </StaticRouter>
        </div>
      </body>
    </html>
  );
}
