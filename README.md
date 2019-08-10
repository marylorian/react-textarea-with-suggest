# react-textarea-with-suggest
Textarea with suggest for React app

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
|autosizable|bool: false|no|using [`<TextareaAutosize>`](https://www.npmjs.com/package/react-textarea-autosize) instead  of `<textarea>` if true|
|className|string: ""|no|className property for `<textarea>` element|
|searchMarker|char: "@"|no|after this symbol will be inited search and onSearch function|
|onChange|func: () => {}|yes|function on change value in textarea|
|onSearch|func: () => {}|yes|function after input of searchMarker into textarea|
|onSuggestItemRender|func|no|custom function for rendering each item in suggest|
```
//onSuggestItemRender

item => 
    <div className="textarea-suggest-item" onClick={() => this.setResult(item)}>
        <div className="textarea-suggest-item--info">
            <div>{item}</div>
        </div>
    </div>
```
|||||
|----|-------------|--------|-----------|
|searchRegexp|string: /@([a-z0\d\-.]+[a-z\d])/gim|no||
|suggestList|array: []|no|rendering suggest when suggestList isn't empty, items rendering in onSuggestItemRender function|
|value|string: ""|no|text value for `<textarea>`|
|any else params for `<textarea>`| - | - |https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes|

## Using libraries
 - "prop-types"
 - "lodash.once"
 - "react-textarea-autosize" (optionally)

## License
Copyright (c) 2019 Maria Lobareva Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).