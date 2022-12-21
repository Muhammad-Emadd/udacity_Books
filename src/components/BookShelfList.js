import React from "react";
import { wordsStartUpperCase } from "../util/BooksAPI";
import BookShelf from "./BookShelf";

function BookShelfList({ shelfs, books }) {
  return shelfs.map((shelf, i) => {
    const shelfUi = wordsStartUpperCase(Object.keys(shelf)[0]);
    return (
      <div key={i} className="bookshelf">
        <h2 className="bookshelf-title">{shelfUi}</h2>
        <div className="bookshelf-books">
          <BookShelf shelf={Object.values(shelf)[0]} bookList={books} />
        </div>
      </div>
    );
  });
}

export default BookShelfList;
