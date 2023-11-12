import path from "node:path";

export function getAssetDirectory() {
  return path.join(
    path.dirname(require.resolve("webfront-js/package.json")),
    "dist/client"
  );
}
