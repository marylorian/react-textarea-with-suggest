import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import { minify } from "terser";

const terser = () => ({
  name: "terser",
  async renderChunk(code, _chunk, outputOptions) {
    const result = await minify(code, {
      module: outputOptions.format === "es",
      sourceMap: Boolean(outputOptions.sourcemap),
      toplevel: outputOptions.format === "cjs",
    });

    return {
      code: result.code || code,
      map: result.map || null,
    };
  },
});

export default [
  {
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
    ],
    external: ["react", "react-dom", "react-textarea-autosize"],
  },
  {
    input: "src/styles.css",
    output: [
      {
        file: "lib/styles.css",
      },
    ],
    plugins: [css({ output: "styles.css" })],
  },
];
