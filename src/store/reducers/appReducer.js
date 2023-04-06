import {
  // ToDos Types
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  ARCHIVE_TODO,
} from "../types";

const initialState = {
  toDos: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        toDos: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        toDos: [...state.toDos, action.payload],
      };
    case UPDATE_TODO:
      return {
        ...state,
        toDos: state.toDos.map((toDo) =>
          toDo.id === action.payload.id ? action.payload : toDo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        toDos: state.toDos.filter((toDo) => toDo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        toDos: state.toDos.map((toDo) =>
          toDo.id === action.payload
            ? {
                ...toDo,
                finishedAt: toDo.finishedAt ? null : new Date().toISOString(),
              }
            : toDo
        ),
      };
    case ARCHIVE_TODO:
      return {
        ...state,
        toDos: state.toDos.map((toDo) =>
          toDo.id === action.payload
            ? {
                ...toDo,
                isArchived: !toDo.isArchived,
                archivedAt: new Date().toISOString(),
              }
            : toDo
        ),
      };
    default:
      return state;
  }
};

export default appReducer;
