import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const styles = () => ({
  name: "styles",
  async generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "styles.css",
      source: await readFile("src/styles.css", "utf8"),
    });
  },
});

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    typescript({
      sourceMap: true,
      inlineSources: true,
      exclude: ["**/testUtils/*"],
    }),
    babel({ babelHelpers: "bundled" }),
    terser(),
    styles(),
  ],
  external: ["react", "react-dom", "react-textarea-autosize"],
};
