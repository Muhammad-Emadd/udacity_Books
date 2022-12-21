import React from "react";

function Book({ authors, title, imageLinks, children }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.thumbnail})`,
            }}
          ></div>
          {children}
        </div>
        <div className="book-title">{`${title}`}</div>
        <div className="book-authors">{`${authors[0]}`}</div>
      </div>
    </li>
  );
}

export default Book;
