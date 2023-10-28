import ky from "ky";

const SSR_SERVER_UPSTREAM = "http://localhost:3000";

export const isServer = typeof window === "undefined";

export const http = ky.create({
  headers: { "content-type": "application/json" },
  prefixUrl: isServer ? SSR_SERVER_UPSTREAM : "/",
  hooks: {
    beforeRequest: [
      (request) => {
        if (isServer && globalThis.cookie) {
          request.headers.set("cookie", globalThis.cookie);
        }
      },
    ],
  },
});
