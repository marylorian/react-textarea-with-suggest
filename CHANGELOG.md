# Changelog

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
