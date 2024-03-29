import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import terser from "@rollup/plugin-terser";

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
