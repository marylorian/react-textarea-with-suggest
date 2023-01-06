import { useState } from "react";
import Textarea from "react-textarea-with-suggest";
import "react-textarea-with-suggest/lib/styles.css";
import "./App.css";

const randomResults = [
  "Hello",
  "The Result",
  "Harry Potter",
  "The Lord Of The Rings",
  "The Matrix",
  "The Truman Show",
  "Home Alone",
  "Cat In The Hat",
  "Alice In Worderland",
  "The Night Knight",
  "The Dark Knight",
  "Dark Night",
  "The Long Night",
  "Good bye",
];

function ExampleItem({ title, codeSnippet, pretty, children }) {
  return (
    <div className="example__item">
      <p>
        <strong>{title}</strong>
      </p>
      <pre>
        <code>
          {pretty
            ? codeSnippet
            : codeSnippet
                .split(" ")
                .map((line, i) => (i === 0 ? line : `    ${line}`))
                .join("\n")}
        </code>
      </pre>
      {children}
    </div>
  );
}

function App() {
  const [controllingValue, setControllingValue] = useState("");
  const [results, setResults] = useState(undefined);

  const onSearch = (searchPhrase) => {
    console.log("onSearch", searchPhrase);

    const start = Math.floor(Math.random() * 10);
    const length = Math.floor(Math.random() * 10);
    const newResults = randomResults
      .slice(start, start + length)
      .filter(Boolean);

    setResults(newResults);
  };

  const onChange = (e) => {
    console.log("onChange", e.target.value, e);
  };

  return (
    <div className="example">
      <h1>Textarea With Suggest Example page</h1>

      <p>
        You can check <code>react-textarea-with-suggest</code> npm page{" "}
        <a
          href="https://www.npmjs.com/package/react-textarea-with-suggest"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </p>
      <p>
        You can check <code>onChange</code> and <code>onSearch</code> firing in
        your Browser console
      </p>

      <ExampleItem
        title="Default"
        codeSnippet={`<Textarea className="example__textarea" onChange={onChange} onSearch={onSearch} suggestList={results} />`}
      >
        <Textarea
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />
      </ExampleItem>

      <ExampleItem
        title="Autosizable"
        codeSnippet={`<Textarea autosizable className="example__textarea" onChange={onChange} onSearch={onSearch} suggestList={results} />`}
      >
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />
      </ExampleItem>

      <ExampleItem
        title="With initial value"
        codeSnippet={`<Textarea autosizable className="example__textarea" value="Initial_Value" onChange={onChange} onSearch={onSearch} suggestList={results} />`}
      >
        <Textarea
          autosizable
          className="example__textarea"
          value="Initial_Value"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />
      </ExampleItem>

      <ExampleItem
        title="As controlled component"
        codeSnippet={`<Textarea className="example__textarea" value={controllingValue} onChange={onChange} onSearch={onSearch} suggestList={results} />`}
      >
        <div className="example__item__input">
          <label htmlFor="textarea-controlling-value">
            Controlling value for TextareaWithSuggest:{" "}
          </label>
          <input
            type="text"
            name="textarea-controlling-value"
            value={controllingValue}
            onChange={(e) => setControllingValue(e.target.value)}
          />
        </div>

        <Textarea
          className="example__textarea"
          value={controllingValue}
          onChange={(e) => {
            onChange(e);
            setControllingValue(e.target.value);
          }}
          onSearch={onSearch}
          suggestList={results}
        />
      </ExampleItem>

      <ExampleItem
        title="With customSuggestItemRenderer"
        pretty
        codeSnippet={`
<Textarea 
  autosizable 
  className="example__textarea" 
  onChange={onChange} 
  onSearch={onSearch} 
  suggestList={results} 
  customSuggestItemRenderer={result => (
    <div className="example__textarea__custom-item">
      <p>Custom: <span>{result}</span></p>
    </div>
  )} />`}
      >
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          customSuggestItemRenderer={(result) => (
            <div className="example__textarea__custom-item">
              <p>
                Custom: <span>{result}</span>
              </p>
            </div>
          )}
        />
      </ExampleItem>

      <ExampleItem
        title="With custom searchMarker '#'"
        codeSnippet={`<Textarea autosizable className="example__textarea" onChange={onChange} onSearch={onSearch} suggestList={results} searchMarker="#" />`}
      >
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          searchMarker="#"
        />
      </ExampleItem>

      <ExampleItem
        title="Closes suggests on focusout, returns back on focusin"
        codeSnippet={`<Textarea autosizable className="example__textarea" onChange={onChange} onSearch={onSearch} suggestList={results} closeSuggestOnFocusOut />`}
      >
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          closeSuggestOnFocusOut
        />
      </ExampleItem>

      <ExampleItem
        title="Cancelling search on focusout"
        codeSnippet={`<Textarea autosizable className="example__textarea" onChange={onChange} onSearch={onSearch} suggestList={results} cancelSearchOnFocusOut />`}
      >
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          cancelSearchOnFocusOut
        />
      </ExampleItem>
    </div>
  );
}

export default App;
