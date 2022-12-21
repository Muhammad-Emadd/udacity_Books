import React, { useEffect, useState } from "react";

function BookShelfChanger({ selectLabel, changeShelfHandler }) {
  // const [shelfHandler,setShelfHandler]= useState('');

  // useEffect(() =>{},[shelfHandler]);
  return (
    <div className="book-shelf-changer">
      <select onChange={(e) => changeShelfHandler(e.target.value)}>
        <option value="none" disabled>
          {`${selectLabel}`}
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

export default BookShelfChanger;
