import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const rootPath = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  base: "/react-textarea-with-suggest/",
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "react-textarea-with-suggest/lib/styles.css": fileURLToPath(
        new URL("../src/styles.css", import.meta.url)
      ),
      "react-textarea-with-suggest": fileURLToPath(
        new URL("../src/index.tsx", import.meta.url)
      ),
    },
  },
  server: {
    fs: {
      allow: [rootPath],
    },
  },
});
