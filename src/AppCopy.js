import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { getAll, update } from "./util/BooksAPI";
import BookShelf from "./components/BookShelf";
import BookShelfChanger from "./components/BookShelfChanger";
import BookShelfList from "./components/BookShelfList";
import { Link } from "react-router-dom";

function AppCopy() {
  const [userBooks, setUserBooks] = useState([]);
  const [shelfIds, setShelfIds] = useState([]);

  const handleshelfIds = function (shelf, id) {
    update(id, shelf).then((res) => {
      const newShelfs = Object.entries(res).map(([key, value]) => {
        return { [key]: value };
      });
      setShelfIds(newShelfs);
    });
  };

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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelfList
            changeShelfHandler={handleshelfIds}
            books={userBooks}
            shelfs={shelfIds}
          />
        </div>
        <div className="open-search">
          <Link to={`search`}>Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default AppCopy;
