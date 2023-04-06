import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import AppProvider from "./AppProvider";

// Redux
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppProvider />
  </Provider>
);
