import { SuperJSONResult } from "superjson";

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: SuperJSONResult;
    __ASSET_MAP__: { js: string[]; css: string[] };
  }

  var process: {
    env: ProcessEnv;
  };

  interface ProcessEnv {
    PUBLIC_SSR_SERVER_ORIGIN: string;
    PUBLIC_API_SERVER_ORIGIN: string;
    KAKAO_CLIENT_ID: string;
  }
}

export {};
