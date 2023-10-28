import {
  PipeableStream,
  RenderToPipeableStreamOptions,
} from "react-dom/server";

type RenderParams = {
  url: string;
  cookie: string | undefined;
};

export function render(
  { url, cookie }: RenderParams,
  options?: RenderToPipeableStreamOptions
): PipeableStream;
