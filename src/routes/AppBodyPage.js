import "./AppBodyPage.css";
import BookShelfList from "../components/BookShelfList";
import { Link } from "react-router-dom";

function AppBodyPage({ handleshelfIds, userBooks, shelfIds }) {
  console.log(shelfIds);

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

export default AppBodyPage;
