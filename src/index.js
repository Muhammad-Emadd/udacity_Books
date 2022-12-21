import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppCopy from "./AppCopy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./components/SearchPage";
import ErrorPage from "./routes/ErrorPage";
const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppCopy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "search",
    element: <Search />,
  },
]);
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={mainRouter} />
  </React.StrictMode>,
  document.getElementById("root")
);
