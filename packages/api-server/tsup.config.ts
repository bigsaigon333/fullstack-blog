import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  target: "node18",
});
