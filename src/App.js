import { useCallback, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Search from "./routes/SearchPage";
import ErrorPage from "./routes/ErrorPage";
import { getAll, update } from "./util/BooksAPI";
import AppBodyPage from "./routes/AppBodyPage";
function App() {
  const [userBooks, setUserBooks] = useState([]);
  const [shelfIds, setShelfIds] = useState([]);
  const [getDataFromApi, setGetDataFromApi] = useState(false);

  const handleshelfIds = function (shelf, id) {
    update(id, shelf).then((res) => {
      const newShelfs = Object.entries(res).map(([key, value]) => {
        return { [key]: value };
      });
      setShelfIds(newShelfs);
      setGetDataFromApi(true);
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
    }, [setShelfIds, getDataFromApi]),
    [getDataFromApi]
  );
  const mainRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppBodyPage
          handleshelfIds={handleshelfIds}
          userBooks={userBooks}
          shelfIds={shelfIds}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "search",
      element: (
        <Search
          userBooks={userBooks}
          handleshelfIds={handleshelfIds}
          shelfIds={shelfIds}
        />
      ),
    },
  ]);

  return <RouterProvider router={mainRouter} />;
}

export default App;
