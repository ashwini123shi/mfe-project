import { combineReducers, Reducer } from "redux";

// import counter from "./counter";
import todos from "./todoReducer";

const rootReducer = combineReducers({
  todos
});

//export type AppState = ReturnType<typeof rootReducer>;
//export default (): Reducer => rootReducer;
export default rootReducer;
