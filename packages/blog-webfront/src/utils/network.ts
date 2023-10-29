import ky from "ky";

const API_SERVER_UPSTREAM = "http://localhost:8080";

export const isServer = typeof window === "undefined";

export const http = ky.create({
  headers: { "content-type": "application/json" },
  prefixUrl: isServer ? API_SERVER_UPSTREAM : "/",
});
