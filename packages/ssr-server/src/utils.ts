import path from "node:path";

export function getAssetDirectory() {
  return path.join(
    path.dirname(require.resolve("blog-webfront/package.json")),
    "dist/client"
  );
}
