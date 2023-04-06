import React from "react";
import styles from "./Weather.module.scss";

// Components
import WeatherCard from "components/WeatherCard";

const WeatherList = () => {
  return (
    <div className={styles.WeatherList}>
      <h2>Weather in next 5 days</h2>

      <div className={styles.cards}>
        <WeatherCard index={3} />
        <WeatherCard index={11} />
        <WeatherCard index={19} />
        <WeatherCard index={27} />
        <WeatherCard index={35} />
      </div>
    </div>
  );
};

export default WeatherList;
