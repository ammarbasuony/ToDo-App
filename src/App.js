import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";

// Actions
import { getToDos } from "store/actions";

// Pages
import Home from "pages/Home";
import WeatherList from "pages/Weather";

// Material UI
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@emotion/react";

const App = ({ colorMode }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    const getToDosFromLocalStorage = JSON.parse(
      localStorage.getItem("toDos") || "[]"
    );
    dispatch(getToDos(getToDosFromLocalStorage));
  }, []);

  return (
    <div className={styles.App}>
      <h1
        style={{
          color: theme.palette.mode === "dark" ? "#eeeeee" : "#000",
        }}
      >
        To Do App
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </h1>

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
