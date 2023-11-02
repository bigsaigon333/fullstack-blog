import { SuperJSONResult } from "superjson";

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: SuperJSONResult;
  }
}

export {};
