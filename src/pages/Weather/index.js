import React from "react";
import { useSelector } from "react-redux";
import styles from "./Weather.module.scss";

// Material UI
import { useTheme } from "@emotion/react";

// Components
import WeatherCard from "components/WeatherCard";

const WeatherList = () => {
  const theme = useTheme();
  const { weather } = useSelector((state) => state.appReducer);

  return (
    <div className={styles.WeatherList}>
      <h2
        style={{
          color: theme.palette.mode === "dark" ? "white" : "black",
        }}
      >
        Weather in next 5 days
      </h2>

      <div className={styles.cards}>
        <WeatherCard weather={weather} index={3} />
        <WeatherCard weather={weather} index={11} />
        <WeatherCard weather={weather} index={19} />
        <WeatherCard weather={weather} index={27} />
        <WeatherCard weather={weather} index={35} />
      </div>
    </div>
  );
};

export default WeatherList;
