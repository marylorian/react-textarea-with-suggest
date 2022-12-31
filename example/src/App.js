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
      <p>Default</p>
      <Textarea
        className="example__textarea"
        onChange={onChange}
        onSearch={onSearch}
        suggestList={results}
      />

      <p>Autosizable</p>
      <Textarea
        autosizable
        className="example__textarea"
        onChange={onChange}
        onSearch={onSearch}
        suggestList={results}
      />

      <p>With initial value</p>
      <Textarea
        autosizable
        className="example__textarea"
        value="Initial Value"
        onChange={onChange}
        onSearch={onSearch}
        suggestList={results}
      />
    </div>
  );
}

export default App;
