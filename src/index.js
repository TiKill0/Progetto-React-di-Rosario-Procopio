import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyAXHZUVP7FFWX8eqg0EUxXFTKQAM6JUOfM"
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=10"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div class="container">
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search for Books"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Search
        </button>
      </form>
      {result.map((book) => (
        <div class="card">
          <a href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
            <div class="container">
              <h1>{book.volumeInfo.title}</h1>
              <h2>{book.volumeInfo.authors}</h2>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
