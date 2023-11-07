import ky from "ky";

export const isServer = typeof window === "undefined";

export const http = ky.create({
  headers: { "content-type": "application/json" },
});

export type RemoteOptions = {
  httpClient?: typeof http;
  signal?: AbortSignal;
};
