import React, { Children } from "react";
import Book from "./Book";
import BookShelfChanger from "./BookShelfChanger";

function BookShelf({ bookList, shelf }) {
  console.log(`sheeeeeeeeelf:${shelf}`);
  const booksUi = bookList
    .filter((book) => shelf.includes(book.id))
    .map((book, i) => (
      <Book key={i} {...book}>
        <BookShelfChanger />
      </Book>
    ));
  return <ol className="books-grid">{booksUi}</ol>;
}

export default BookShelf;
