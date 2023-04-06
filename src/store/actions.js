import {
  // ToDos Types
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  ARCHIVE_TODO,
} from "./types";

// ToDos Actions
export const getToDos = (toDos) => {
  return {
    type: GET_TODOS,
    payload: toDos,
  };
};

export const addToDo = (toDo) => {
  return {
    type: ADD_TODO,
    payload: toDo,
  };
};

export const updateToDo = (toDo) => {
  return {
    type: UPDATE_TODO,
    payload: toDo,
  };
};

export const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const toggleToDo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: id,
  };
};

export const archiveToDo = (id) => {
  return {
    type: ARCHIVE_TODO,
    payload: id,
  };
};
