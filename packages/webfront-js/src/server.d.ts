import { DehydrateOptions, DehydratedState } from "@tanstack/react-query";
import {
  PipeableStream,
  RenderToPipeableStreamOptions,
} from "react-dom/server";

type RenderParams = {
  url: string;
  cookie: string | undefined;
  assetMap: { js: string[]; css: string[] };
};

export function makeRenderContext(
  renderParams: RenderParams,
  options?: RenderToPipeableStreamOptions
): {
  render: (options?: RenderToPipeableStreamOptions) => PipeableStream;
  dehydrate: (options?: DehydrateOptions) => string;
};
