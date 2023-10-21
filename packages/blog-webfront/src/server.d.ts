import {
  PipeableStream,
  RenderToPipeableStreamOptions,
} from "react-dom/server";

export function render(
  url: string,
  options?: RenderToPipeableStreamOptions
): PipeableStream;
