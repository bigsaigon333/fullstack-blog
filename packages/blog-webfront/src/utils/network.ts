import ky from "ky";

const API_SERVER_ORIGIN = "http://localhost:8080";

export const isServer = typeof window === "undefined";

export const http = ky.create({
  headers: { "content-type": "application/json" },
  prefixUrl: isServer ? API_SERVER_ORIGIN : "/",
});

export type RemoteOptions = {
  httpClient?: typeof http;
  signal?: AbortSignal;
};
