# react-textarea-with-suggest
Textarea with suggest for React app v2

[![npm version](https://badge.fury.io/js/react-textarea-with-suggest.svg)](https://badge.fury.io/js/react-textarea-with-suggest)

### Last changes
[You can find in CHANGELOG.md](./CHANGELOG.md)

### Demo
[You can try component here](https://marylorian.github.io/react-textarea-with-suggest/)

## Install
If you use npm
```
npm install --save react-textarea-with-suggest
```
or 
```
yarn add react-textarea-with-suggest
```

## Usage

### To use built-in styles

```
import "react-textarea-with-suggest/lib/styles.css";
```

### For functional component
```
import Textarea from "react-textarea-with-suggest";

const MyApp = (props) => {
    const [text, setText] = useState<string>("")
    const { results, search } = useMyOwnSearchResults();
    
    return <Textarea 
        className="myapp-textarea"
        value={text}
        onChange={({ target }) => setText({ target.value })}
        onSearch={(searchPhrase) => search(searchPhrase)}
        suggestList={results}
        searchMarker="@"
        autoFocus
    />
}
```

### For class component
```
import Textarea from "react-textarea-with-suggest";
import { search } from "../actions"

export default class MyApp extends React.Component {
    state = { text: "" };
    
    render () {
        return <Textarea 
            className="myapp-textarea"
            value={text}
            onChange={({ target }) => this.setState({ text: target.value })}
            onSearch={(params) => this.props.search(params)}
            searchMarker="@"
            autoFocus
        />
    }
}
```

## Params

|Name|Default value|Required|Description|
|----|-------------|--------|-----------|
|autosizable|boolean: false|no|using [`<TextareaAutosize>`](https://www.npmjs.com/package/react-textarea-autosize) instead  of `<textarea>` if true|
|value|string: ""|no|initial text value for `<textarea>`|
|className|string: ""|no|className property for `<textarea>` element|
|searchMarker|char: "@"|no|after this symbol will be inited search and onSearch function|
|searchRegexp|string: /@([a-z0\d\-.]+[a-z\d])/gim|no|default RegExp to detect search phrase after searchMarker|
|closeSuggestOnFocusOut|boolean: false|no|closes suggest on `focusout` and returns back on `focusin`|
|cancelSearchOnFocusOut|boolean: false|no|cancelling search on `focusout`|
|onChange|func: (event: React.ChangeEvent) => {}|no|function on change value in textarea|
|onSearch|func: (searchPhrase: string) => {}|yes|function after input of searchMarker into textarea|
|suggestList|array: (string OR CustomType)[]: []|no|rendering suggest when suggestList isn't empty, items rendering in customSuggestItemRenderer function|
|customSuggestItemRenderer|func: (searchListItem: string OR CustomType, isSelected: boolean) => ReactNode|no|custom function for rendering each item in suggest, second argument is true if user navigates through items by keyboard and stops on current element|
```
//customSuggestItemRenderer

(item) => 
    <div className="textarea-suggest-item" onClick={myOwnClickHandler}>
        <div className="textarea-suggest-item__info">
            <div>{item.name}</div>
            <div>{item.description}</div>
        </div>
    </div>
```
|||||
|----|-------------|--------|-----------|
|any else params for `<textarea>`| - | - |https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes|

## Using libraries
 - "react-textarea-autosize" (optionally)

## License
Copyright (c) 2019 Mariia Lobareva Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).
