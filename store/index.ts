import { createStore } from "redux";
import rootReducer, { State } from "./reducers";

export default (initialState?: Partial<State>) => {
  const store = createStore(rootReducer, initialState);
  return store;
};
