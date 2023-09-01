import ky from "ky";

export const http = ky.create({
  headers: { "content-type": "application/json" },
});
