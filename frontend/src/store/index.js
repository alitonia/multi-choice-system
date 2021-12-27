import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducers from "./reducers";

const getMiddleware = () => applyMiddleware(logger);
const store = createStore(reducers, composeWithDevTools(getMiddleware()));

export default store;
