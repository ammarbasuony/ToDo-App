import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Actions
import { deleteToDo, archiveToDo, toggleToDo, updateToDo } from "store/actions";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const ToDoCard = ({
  id = 1,
  title = "Hello",
  description = "Hello",
  isArchived = false,
  createdAt = "2021-10-10T10:10:10.000Z",
  finishedAt = null,
  archivedAt = null,
}) => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setTitle] = useState(title);
  const [editedDescription, setDescription] = useState(description);

  const isoToLocale = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  const deleteToDoHandler = (id) => {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    const filteredToDos = toDos.filter((td) => td.id !== id);

    dispatch(deleteToDo(id));

    localStorage.setItem("toDos", JSON.stringify(filteredToDos));
  };

  const archiveToDoHandler = (id) => {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];

    const filteredToDos = toDos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          isArchived: !td.isArchived,
          archivedAt: new Date().toISOString(),
        };
      }
      return td;
    });

    dispatch(archiveToDo(id));

    localStorage.setItem("toDos", JSON.stringify(filteredToDos));
  };

  const finishToDoHandler = (id) => {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];

    const filteredToDos = toDos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          finishedAt: td.finishedAt ? null : new Date().toISOString(),
        };
      }
      return td;
    });

    dispatch(toggleToDo(id));

    localStorage.setItem("toDos", JSON.stringify(filteredToDos));
  };

  const saveToDoHandler = (id) => {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];

    const getEditedToDo = toDos.find((td) => td.id === id);

    const editedToDo = {
      ...getEditedToDo,
      title: editedTitle,
      description: editedDescription,
    };

    dispatch(updateToDo(editedToDo));

    const filteredToDos = toDos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          title: editedTitle,
          description: editedDescription,
        };
      }
      return td;
    });

    localStorage.setItem("toDos", JSON.stringify(filteredToDos));
    setIsEditMode(false);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          <strong>Created At:</strong> {isoToLocale(createdAt)}
        </Typography>
        <Typography variant="h5" component="div">
          {isEditMode ? (
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={editedTitle}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: "100%", marginTop: "10px" }}
            />
          ) : (
            title
          )}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {isEditMode ? (
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={editedDescription}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ width: "100%", marginTop: "10px" }}
            />
          ) : (
            description
          )}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {finishedAt && (
            <>
              <strong>Finished At:</strong> {isoToLocale(finishedAt)}
            </>
          )}
        </Typography>
        {isArchived && (
          <Typography
            sx={{ fontSize: 12, color: "primary.light" }}
            color="text.secondary"
            gutterBottom
          >
            <strong>Archived At:</strong> {isoToLocale(archivedAt)}
          </Typography>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardActions>
        {isEditMode ? (
          <>
            <Button size="small" onClick={() => saveToDoHandler(id)}>
              Save
            </Button>

            <Button
              size="small"
              color="error"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={() => finishToDoHandler(id)}>
              {finishedAt ? "Uncomplete" : "Finish"}
            </Button>

            <Button size="small" onClick={() => archiveToDoHandler(id)}>
              {isArchived ? "Unarchive" : "Archive"}
            </Button>

            <Button size="small" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              onClick={() => deleteToDoHandler(id)}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ToDoCard;
