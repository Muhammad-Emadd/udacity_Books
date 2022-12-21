import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { getAll } from "./util/BooksAPI";
import BookShelf from "./components/BookShelf";
import BookShelfChanger from "./components/BookShelfChanger";
import BookShelfList from "./components/BookShelfList";

function AppCopy() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const [shelf, setShelf] = useState("");
  const [shelfIds, setShelfIds] = useState([]);

  const bookShelfsList = function (allBooksData) {
    return allBooksData.reduce((shelfsNameArr, book) => {
      if (shelfsNameArr.findIndex((el) => el[book.shelf]) < 0) {
        return [...shelfsNameArr, { [book.shelf]: [book.id] }];
      } else {
        shelfsNameArr
          .find((shelf) => shelf[book.shelf])
          [book.shelf].push(book.id);
        return shelfsNameArr;
      }
    }, []);
  };
  const bookShelfsLis = function (allBooksData) {
    return allBooksData.map((shelfsNameArr, book) => {
      if (shelfsNameArr.findIndex((el) => el[book.shelf]) < 0) {
        return [...shelfsNameArr, { [book.shelf]: [book.id] }];
      } else {
        shelfsNameArr
          .find((shelf) => shelf[book.shelf])
          [book.shelf].push(book.id);
        return shelfsNameArr;
      }
    }, []);
  };

  function changeShelf(shelfName) {
    setShelf(shelfName);
    console.log(shelfName);
  }

  useCallback(
    useEffect(() => {
      getAll().then((books) => {
        const loadedBooks = [];
        const loadedShelfIds = [];
        books.forEach(({ title, id, shelf, authors, imageLinks }) => {
          loadedBooks.push({ title, id, shelf, authors, imageLinks });
          loadedShelfIds.findIndex((el) => el[shelf]) < 0
            ? loadedShelfIds.push({ [shelf]: [id] })
            : loadedShelfIds
                .find((stateShelf) => stateShelf[shelf])
                [shelf].push(id);
        });
        setUserBooks(loadedBooks);
        setShelfIds(loadedShelfIds);
      });
    }, [])
  );
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {/* {userBooks.length > 0 ? (
                <BookShelf shelfName={"a7a"} bookList={userBooks}>
                  <BookShelfChanger
                    selectLabel={"add"}
                    changeShelfHandler={changeShelf}
                  />
                </BookShelf>
              ) : (
                ""
              )} */}

            <BookShelfList books={userBooks} shelfs={shelfIds} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppCopy;
