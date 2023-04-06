import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";

// Actions
import { getToDos } from "store/actions";

// Pages
import Home from "pages/Home";
import WeatherList from "pages/Weather";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getToDosFromLocalStorage = JSON.parse(
      localStorage.getItem("toDos") || "[]"
    );
    dispatch(getToDos(getToDosFromLocalStorage));
  }, []);

  return (
    <div className={styles.App}>
      <h1>To Do App</h1>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
