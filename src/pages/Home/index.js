import styles from "./Home.module.scss";

// Components
import ToDoCard from "components/ToDoCard";
import WeatherCard from "components/WeatherCard";

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.weather}>
        <WeatherCard withLink={true} />
      </div>
    </div>
  );
};

export default Home;
