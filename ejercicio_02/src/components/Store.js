import { combineReducers, legacy_createStore } from "redux";
import CourseReducer from "./reducers/CourseReducer";

const ConfigureStore = () => {
  const reducers = combineReducers({ Courses: CourseReducer });
  const store = legacy_createStore(reducers);
  return store;
};

export default ConfigureStore;
