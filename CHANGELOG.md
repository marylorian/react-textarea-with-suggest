# Changelog

## v2.6.0 (2026-05-21)

**Build and release:**
- upgraded the build pipeline from Rollup 2 to Rollup 4
- moved the Rollup config to `rollup.config.mjs`
- updated Rollup plugins, including `@rollup/plugin-babel`, `@rollup/plugin-typescript`, and `@rollup/plugin-terser`
- added explicit `tslib` support required by the TypeScript Rollup plugin
- fixed CI build failures related to missing `crypto`/terser serialization behavior and missing `tslib`
- added Node engine metadata and expanded CI coverage to Node 18, 22, and 24
- updated GitHub Actions to current `checkout` and `setup-node` actions with npm caching
- added automated release tooling for changelog updates, version bumps, release tags, and npm publishing

**Dependency maintenance:**
- updated `react-textarea-autosize` from 8.4.0 to 8.5.3
- updated build artifacts after dependency and build-tool changes
- applied Dependabot/Snyk maintenance updates across root and example dependencies, including Babel, webpack, js-yaml, braces, minimatch, lodash, form-data, postcss, serialize-javascript, and related transitive packages

## v2.5.0 (2023-09-30)

**Implemented enhancements:**
[By @pazoozoo42 Pull Request](https://github.com/marylorian/react-textarea-with-suggest/pull/9):
- added option `autoHighlightFirstItem` to automatically hightlight first item in the suggestions list
- added enum `AutoHighlightFirstItemValues` with allowed `autoHighlightFirstItem` values to `constants.ts`

## v2.4.0 (2023-02-20)

**Implemented enhancements:**
[By @pazoozoo42 Pull Request](https://github.com/marylorian/react-textarea-with-suggest/pull/8):
- added access to textarea DOM element from parent components through new `forwardedRef` prop. 
- added TextareaAutosizeProps to the type definition to eliminate TS warning when using autoresizable textarea with TypeScript

## v2.3.0 (2023-01-06)

**Implemented enhancements:**
- implemented unit-tests, set test coverage to 85% [by PR](https://github.com/marylorian/react-textarea-with-suggest/pull/7)

## v2.2.0 (2023-01-02)

**Implemented enhancements:**
- adds `keydown` handling to navigate through suggested variants by ArrowDown, ArrowUp, Enter (to apply selected item), Escape (to stop searching)

## v2.1.4 (2023-01-02)

**Fixed bugs:**
- fixes with clearing input

## v2.1.3 (2023-01-01)

**Fixed bugs:**
- fixes bug with onchange event value, when value from suggest was overriden by react
- fixes bug with old `target.value` for case with completely controlled value
- fixed margins in default .css
- removes default .css file from default imports

## v2.1.2 (2022-12-31)

**Fixed bugs:**
- fixed bug with click on suggest items rendered by customSuggestItemRenderer on mobile devices

## v2.1.1 (2022-12-31)

**Fixed bugs:**
- fixed bug with classname prop to suggest block

## v2.1.0 (2022-12-31)

**Implemented enhancements:**
- updates props description README.md
- adds [Demo page](https://marylorian.github.io/react-textarea-with-suggest/)
- implemented logic to interrupt search by `focusout`
- implemented logic to hide/show suggest block by `focusin`/`focusout`

## v2.0.0 (2022-12-30)

**Implemented enhancements:**
- supports TypeScript and new React versions

**Fixed bugs:**
- fixed bug with installing
- fixed bug with duplicated React version 
