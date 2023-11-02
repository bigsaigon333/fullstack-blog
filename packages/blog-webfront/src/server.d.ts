import { DehydrateOptions, DehydratedState } from "@tanstack/react-query";
import {
  PipeableStream,
  RenderToPipeableStreamOptions,
} from "react-dom/server";

type RenderParams = {
  url: string;
  cookie: string | undefined;
};

export function makeRenderContext(
  { url, cookie }: RenderParams,
  options?: RenderToPipeableStreamOptions
): {
  render: (options?: RenderToPipeableStreamOptions) => PipeableStream;
  dehydrate: (options?: DehydrateOptions) => string;
};
