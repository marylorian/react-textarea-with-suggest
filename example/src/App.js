import { useState } from "react";
import Textarea from "react-textarea-with-suggest";
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

function App() {
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
    console.log("onChange", e.target.value);
  };

  return (
    <div className="example">
      <h1>TextareaWithSuggest Example</h1>

      <div className="example__item">
        <p>Default</p>
        <p>
          <code>
            {`<Textarea
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />`}
          </code>
        </p>
        <Textarea
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />
      </div>

      <div className="example__item">
        <p>Autosizable</p>
        <p>
          <code>
            {`<Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />`}
          </code>
        </p>
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />
      </div>

      <div className="example__item">
        <p>With initial value</p>
        <p>
          <code>
            {`<Textarea
          autosizable
          className="example__textarea"
          value="Initial Value"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />`}
          </code>
        </p>
        <Textarea
          autosizable
          className="example__textarea"
          value="Initial Value"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
        />
      </div>

      <div className="example__item">
        <p>With customSuggestItemRenderer</p>
        <p>
          <code>
            {`<Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          customSuggestItemRenderer={(result, defaultOnClick) => (
            <div
              className="example__textarea__custom-item"
              onClick={defaultOnClick}
            >
              <p>
                Custom: <span>{result}</span>
              </p>
            </div>
          )}
        />`}
          </code>
        </p>
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          customSuggestItemRenderer={(result, defaultOnClick) => (
            <div
              className="example__textarea__custom-item"
              onClick={defaultOnClick}
            >
              <p>
                Custom: <span>{result}</span>
              </p>
            </div>
          )}
        />
      </div>

      <div className="example__item">
        <p>With custom searchMarker "#"</p>
        <p>
          <code>
            {`<Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          searchMarker="#"
        />`}
          </code>
        </p>
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          searchMarker="#"
        />
      </div>

      <div className="example__item">
        <p>Closes suggests on focusout, returns back on focusin</p>
        <p>
          <code>
            {`<Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          closeSuggestOnFocusOut
        />`}
          </code>
        </p>
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          closeSuggestOnFocusOut
        />
      </div>

      <div className="example__item">
        <p>Cancelling search on focusout</p>
        <p>
          <code>
            {`<Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          cancelSearchOnFocusOut
        />`}
          </code>
        </p>
        <Textarea
          autosizable
          className="example__textarea"
          onChange={onChange}
          onSearch={onSearch}
          suggestList={results}
          cancelSearchOnFocusOut
        />
      </div>
    </div>
  );
}

export default App;
