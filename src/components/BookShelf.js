import React from "react";
import Book from "./Book";
import BookShelfChanger from "./BookShelfChanger";

function BookShelf({ bookList, shelf, changeShelfHandler }) {
  const shelfIdsList = Object.values(shelf)[0];
  const booksUi =
    shelfIdsList?.length > 0
      ? bookList
          .filter((book) => shelfIdsList.includes(book.id))
          .map((book, i) => (
            <Book key={i} {...book}>
              <BookShelfChanger
                changeShelfHandler={changeShelfHandler}
                shelf={shelf}
                bookId={book.id}
              />
            </Book>
          ))
      : bookList.map((book, i) => (
          <Book key={i} {...book}>
            <BookShelfChanger
              changeShelfHandler={changeShelfHandler}
              shelf={shelf}
              bookId={book.id}
            />
          </Book>
        ));
  return <ol className="books-grid">{booksUi}</ol>;
}

export default BookShelf;
