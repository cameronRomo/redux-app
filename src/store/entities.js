import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./bugs";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
});
