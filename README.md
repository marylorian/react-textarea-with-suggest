# react-textarea-with-suggest

A small React textarea component with inline suggestions. Type a marker such as `@`, provide matching results, and let users pick a suggestion with the mouse, touch, or keyboard.

[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/marylorian/react-textarea-with-suggest/master?label=latest%20version)](https://www.npmjs.com/package/react-textarea-with-suggest)
![NPM](https://img.shields.io/npm/l/react-textarea-with-suggest)
![npm type definitions](https://img.shields.io/npm/types/react-textarea-with-suggest)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-textarea-with-suggest/peer/react)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-textarea-with-suggest/peer/react-dom)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/react-textarea-with-suggest/latest)
![Server Side Rendering](https://img.shields.io/badge/SSR-supported-green)

## Demo

Try the live example: [marylorian.github.io/react-textarea-with-suggest](https://marylorian.github.io/react-textarea-with-suggest/)

## Install

```sh
npm install react-textarea-with-suggest
```

```sh
yarn add react-textarea-with-suggest
```

The package expects React and React DOM to be installed in your app:

```sh
npm install react react-dom
```

## Quick Start

Import the component and the default styles:

```tsx
import { useState } from "react";
import Textarea from "react-textarea-with-suggest";
import "react-textarea-with-suggest/lib/styles.css";

const users = ["maria", "alex", "sam"];

export function CommentBox() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <Textarea
      className="comment-box"
      value={value}
      suggestList={suggestions}
      onChange={(event) => setValue(event.target.value)}
      onSearch={(query) => {
        setSuggestions(users.filter((user) => user.includes(query)));
      }}
    />
  );
}
```

Now typing `@ma` opens suggestions that match the current search text. Selecting `maria` inserts `@maria ` into the textarea.

## Common Usage

### Use a Different Marker

Use `searchMarker` when you want suggestions for another one-character marker, such as `#` for tags.

```tsx
<Textarea
  searchMarker="#"
  suggestList={tags}
  onSearch={(query) => setTags(searchTags(query))}
/>
```

### Autosize the Textarea

Set `autosizable` to use [`react-textarea-autosize`](https://www.npmjs.com/package/react-textarea-autosize) internally.

```tsx
<Textarea autosizable suggestList={suggestions} onSearch={searchUsers} />
```

### Render Custom Suggestion Items

Use string suggestions for the value that should be inserted into the textarea. If you want richer visual items, customize how each string is displayed with `customSuggestItemRenderer`.

```tsx
<Textarea
  suggestList={["maria", "alex", "sam"]}
  onSearch={searchUsers}
  customSuggestItemRenderer={(item, isSelected) => (
    <div className={isSelected ? "suggestion suggestion--selected" : "suggestion"}>
      <strong>@{item}</strong>
      <span> Team member</span>
    </div>
  )}
/>
```

### Controlled Value

The component accepts `value` and `onChange`, so it can be used as a controlled field.

```tsx
const [message, setMessage] = useState("");

<Textarea
  value={message}
  suggestList={suggestions}
  onChange={(event) => setMessage(event.target.value)}
  onSearch={searchUsers}
/>;
```

## Props

| Name | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| `onSearch` | `(searchPhrase: string) => void` | - | Yes | Called when the user is typing after the marker. Use it to update `suggestList`. |
| `suggestList` | `ReactNode[]` | `[]` | No | Suggestions shown in the popup. Strings are the safest option because the selected item is inserted as text. |
| `value` | `string` | `""` | No | Textarea value. |
| `onChange` | `(event: React.ChangeEvent<HTMLTextAreaElement>) => void` | - | No | Called when the textarea value changes. |
| `className` | `string` | `""` | No | Class name passed to the textarea and used by the suggestions popup. |
| `autosizable` | `boolean` | `false` | No | Uses `react-textarea-autosize` instead of a native `textarea`. |
| `searchMarker` | `string` | `"@"` | No | One-character marker that starts suggestions. |
| `searchRegexp` | `RegExp` | generated from `searchMarker` | No | Custom pattern used to detect the current search phrase. |
| `customSuggestItemRenderer` | `(item, isSelected) => ReactNode` | - | No | Custom renderer for each suggestion row. |
| `closeSuggestOnFocusOut` | `boolean` | `false` | No | Hides suggestions when the textarea loses focus and shows them again on focus. |
| `cancelSearchOnFocusOut` | `boolean` | `false` | No | Cancels the current search when the textarea loses focus. |
| `autoHighlightFirstItem` | `"always" \| "only_single_item" \| "never"` | `"never"` | No | Controls whether the first suggestion is highlighted automatically. |
| `forwardedRef` | `RefObject<HTMLTextAreaElement>` | - | No | Ref forwarded to the underlying textarea. |

You can also pass standard textarea attributes such as `placeholder`, `disabled`, `autoFocus`, `rows`, and `maxLength`.

## Keyboard Controls

When suggestions are open:

| Key | Action |
| --- | ------ |
| `ArrowDown` | Move to the next suggestion. |
| `ArrowUp` | Move to the previous suggestion. |
| `Enter` | Insert the selected suggestion. |
| `Escape` | Close suggestions. |

## Styling

For the default styles, import:

```tsx
import "react-textarea-with-suggest/lib/styles.css";
```

You can also provide your own styles. The component renders a wrapper, textarea, and suggestion list using these base classes:

```css
.textarea-suggest {
}

.textarea-suggest__result {
}

.textarea-suggest__result-item {
}

.textarea-suggest__result-item_selected {
}
```

## Local Development

Install dependencies and build the library:

```sh
npm install
npm run build
```

Run checks:

```sh
npm run prettier:check
npm test
```

Run the example app:

```sh
cd example
npm install
npm start
```

## Releases

Release notes are tracked in [CHANGELOG.md](./CHANGELOG.md).

Maintainers can create a release with:

```sh
npm run release -- --type=minor --yes
```

The CI release flow publishes the package and deploys the example app after a release commit and tag are pushed to `master`.

## License

Copyright (c) 2019-present Mariia Lobareva.

Licensed under the [MIT License](http://opensource.org/licenses/MIT).
