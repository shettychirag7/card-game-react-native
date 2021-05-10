import { AnyAction } from "redux";
import { types } from "../../actions/score";

export interface ScoreState {
  steps: number;
}

const initialState: ScoreState = {
  steps: 0,
};

const scoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.INCREMENT_SCORE: {
      return {
        ...state,
        steps: state.steps + 1,
      };
    }
    case types.RESET_SCORE: {
      return {
        ...state,
        steps: 0,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default scoreReducer;
