import React, { useState } from "react";

function BookShelfChanger({
  selectLabel,
  changeShelfHandler,
  bookId,
  bookShelf,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const changeShelfAndUiHandler = (event) => {
    changeShelfHandler(event.target.value, bookId);
    setSelectedOption(event.target.value);
  };

  const chick = (shelfNameUi) => (bookShelf === shelfNameUi ? " ✔  " : "");
  return (
    <div className="book-shelf-changer">
      <select value={bookShelf} onChange={(e) => changeShelfAndUiHandler(e)}>
        <option value="none" disabled>
          {`${selectLabel}`}
        </option>
        <option value="currentlyReading">
          {chick("currentlyReading")}
          Currently Reading
        </option>
        <option value="wantToRead">{chick("wantToRead")}Want to Read</option>
        <option value="read">{chick("read")}Read</option>
        <option value="none">{chick("none")}None</option>
      </select>
    </div>
  );
}

export default BookShelfChanger;
