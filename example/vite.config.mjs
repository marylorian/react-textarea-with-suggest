import { defineConfig } from "vite";
export default defineConfig({
  base: "/react-textarea-with-suggest/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
