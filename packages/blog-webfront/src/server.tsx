import {
  PipeableStream,
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import App from "./App.js";

export function render(
  options?: RenderToPipeableStreamOptions
): PipeableStream {
  return renderToPipeableStream(<App />, options);
}
