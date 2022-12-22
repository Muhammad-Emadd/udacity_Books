import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../util/BooksAPI";
import Book from "./Book";
import BookShelfChanger from "./BookShelfChanger";
const Search = React.memo(() => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value && enteredFilter.length) {
        search(enteredFilter, 20)
          .then((responseData) => {
            if (responseData.length > 0) {
              const loadedBooks = [];
              responseData?.forEach(
                ({ title, id, shelf, authors, imageLinks }) =>
                  loadedBooks.push({ title, id, shelf, authors, imageLinks })
              );
              setSearchBooks(loadedBooks);
            }
          })
          .catch((error) => {});
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, setSearchBooks, inputRef]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => {
            navigate(-1);
          }}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooks.length > 0
            ? searchBooks.map((book, i) => (
                <Book key={i} {...book}>
                  <BookShelfChanger bookId={book.id} />
                </Book>
              ))
            : ""}
        </ol>
      </div>
    </div>
  );
});

export default Search;
