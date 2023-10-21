import { isServer } from "@tanstack/react-query";
import ky from "ky";

const SSR_SERVER_UPSTREAM = "http://localhost:4000";

export const http = ky.create({
  headers: { "content-type": "application/json" },
  prefixUrl: isServer ? SSR_SERVER_UPSTREAM : "/",
});
