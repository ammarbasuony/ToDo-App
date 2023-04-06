import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./CreateToDo.module.scss";

// Actions
import { addToDo } from "store/actions";

// Material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateToDo = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const insertToDo = () => {
    const newToDo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      createdAt: new Date().toISOString(),
      finishedAt: null,
      archivedAt: null,
      isArchived: false,
    };

    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    toDos.push(newToDo);

    dispatch(addToDo(newToDo));

    localStorage.setItem("toDos", JSON.stringify(toDos));

    setTitle("");
    setDescription("");
  };

  return (
    <div className={styles.CreateToDo}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variant="contained" onClick={() => insertToDo()}>
        Add ToDo
      </Button>
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default CreateToDo;
