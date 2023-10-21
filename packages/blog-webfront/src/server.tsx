import {
  PipeableStream,
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./App.js";

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
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
