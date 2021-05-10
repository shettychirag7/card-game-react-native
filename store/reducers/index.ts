import { combineReducers } from "redux";

import flipCardReducer, { FlipCardState } from "./flipcards";

export interface State {
  flipcard: FlipCardState;
}

export default combineReducers({
  flipcard: flipCardReducer,
});
