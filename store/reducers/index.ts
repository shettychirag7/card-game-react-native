import { combineReducers } from "redux";

import flipCardReducer, { FlipCardState } from "./flipcards";
import scoreReducer, { ScoreState } from "./score";

export interface State {
  flipcard: FlipCardState;
  score: ScoreState;
}

export default combineReducers({
  flipcard: flipCardReducer,
  score: scoreReducer,
});
