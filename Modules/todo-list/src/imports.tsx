import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import RootReducer from "./redux/rootReducer";

export const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
//const store = createStore(RootReducer);
export const store = createStore(RootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(logger),
  // other store enhancers if any
));