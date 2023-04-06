import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";

// Shared
import TabPanel from "shared/TabPanel";

// Components
import ToDoCard from "components/ToDoCard";
import WeatherCard from "components/WeatherCard";
import CreateToDo from "components/CreateToDo";

// Material UI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const Home = () => {
  const { toDos } = useSelector((state) => state.appReducer);
  const [value, setValue] = useState(0);
  const [allToDos, setAllToDos] = useState([]);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("toDos", toDos);
    setAllToDos(toDos);
  }, [toDos]);

  return (
    <div className={styles.Home}>
      <div className={styles.weather}>
        <WeatherCard withLink={true} />
      </div>
      <CreateToDo />

      <div className={styles.toDos}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Active Notes" {...a11yProps(0)} />
            <Tab label="Archived" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className={styles.toDosContent}>
          {allToDos
            .filter((td) => !td.isArchived)
            .map((toDo) => (
              <ToDoCard
                key={toDo.id}
                id={toDo.id}
                title={toDo.title}
                description={toDo.description}
                createdAt={toDo.createdAt}
                finishedAt={toDo.finishedAt}
                archivedAt={toDo.archivedAt}
                isArchived={toDo.isArchived}
              />
            ))}
        </TabPanel>
        <TabPanel value={value} index={1} className={styles.toDosContent}>
          {allToDos
            .filter((td) => td.isArchived)
            .map((toDo) => (
              <ToDoCard
                key={toDo.id}
                id={toDo.id}
                title={toDo.title}
                description={toDo.description}
                createdAt={toDo.createdAt}
                finishedAt={toDo.finishedAt}
                archivedAt={toDo.archivedAt}
                isArchived={toDo.isArchived}
              />
            ))}
        </TabPanel>
      </div>
    </div>
  );
};

export default Home;
