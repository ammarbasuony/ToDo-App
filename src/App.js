import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import styles from "./App.module.scss";

// Actions
import { getToDos, getWeather } from "store/actions";

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
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const API_KEY = "2b3ea704448c739eae3a40b6bb855225";

  const getCurrentWeather = async (lat, lon) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    dispatch(getWeather(response.data));
  };

  const getLatLon = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
      });
    }
  };

  useEffect(() => {
    getLatLon();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getCurrentWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

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
