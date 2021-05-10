import { AnyAction } from "redux";
import { types } from "../../actions/flipcards";

import { shuffle, randomPair } from "../../../utils";

export interface FlipCardState {
  data: Card[];
  firstFlip?: Card;
  secondFlip?: Card;
  complete?: boolean;
}

export interface Card {
  id: number;
  value: number;
  flipped: boolean;
  enabled: boolean;
}

const initialState: FlipCardState = {
  data: [],
  complete: false,
};

const flipCardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.GENERATE_RANDOM_CARD_VALUES: {
      const numPairArr = shuffle(randomPair(6));
      return {
        ...state,
        data: numPairArr.map((num, index) => ({
          id: index,
          value: num,
          flipped: false,
          enabled: true,
        })),
        firstFlip: null,
        secondFlip: null,
        complete: false,
      };
    }
    case types.SET_FIRST_FLIP: {
      const id = action.payload;
      const prevData = [...state.data];

      return {
        ...state,
        firstFlip: { ...prevData[id], flipped: true },
        data: [
          ...prevData.slice(0, id),
          { ...prevData[id], flipped: !prevData[id].flipped },
          ...prevData.slice(id + 1),
        ],
      };
    }
    case types.SET_SECOND_FLIP: {
      const id = action.payload;
      const prevData = [...state.data];
      const nextData = [
        ...prevData.slice(0, id),
        { ...prevData[id], flipped: !prevData[id].flipped },
        ...prevData.slice(id + 1),
      ];
      return {
        ...state,
        secondFlip: { ...prevData[id], flipped: true },
        data: nextData,
        complete:
          nextData.filter((item) => item.flipped === false).length === 0,
      };
    }
    case types.RESET_FLIPS: {
      return {
        ...state,
        firstFlip: undefined,
        secondFlip: undefined,
      };
    }
    case types.SET_DISABLED: {
      const prevData = [...state.data];
      return {
        ...state,
        data: [
          ...prevData.map((item) => {
            if (
              item.id === state.firstFlip?.id ||
              item.id === state.secondFlip?.id
            ) {
              return { ...item, enabled: false };
            }
            return { ...item };
          }),
        ],
      };
    }
    case types.FLIP_UNMATCHED_CARDS: {
      const prevData = [...state.data];
      return {
        ...state,
        data: [
          ...prevData.map((item) => {
            if (
              item.id === state.firstFlip?.id ||
              item.id === state.secondFlip?.id
            ) {
              return { ...item, flipped: false };
            }
            return { ...item };
          }),
        ],
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default flipCardReducer;
