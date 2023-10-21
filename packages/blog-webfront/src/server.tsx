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

export function render(
  url: string,
  options?: RenderToPipeableStreamOptions
): PipeableStream {
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
