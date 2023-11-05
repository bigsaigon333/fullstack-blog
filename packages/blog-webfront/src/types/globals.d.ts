import { SuperJSONResult } from "superjson";

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: SuperJSONResult;
    __ASSET_MAP__: { js: string[]; css: string[] };
  }
}

export {};
