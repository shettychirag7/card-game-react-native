export const types = {
  GENERATE_RANDOM_CARD_VALUES: "GENERATE_RANDOM_CARD_VALUES",
  SET_FIRST_FLIP: "SET_FLIPSET_FIRST_FLIPPED",
  SET_SECOND_FLIP: "SET_SECOND_FLIP",
  SET_DISABLED: "SET_DISABLED",
  RESET_FLIPS: "RESET_CARD_FLIPS",
  FLIP_UNMATCHED_CARDS: "FLIP_UNMATCHED_CARDS",
};

export const actions = {
  getRandomCardValues: () => ({ type: types.GENERATE_RANDOM_CARD_VALUES }),
  setFirstFlip: (id: number) => ({
    type: types.SET_FIRST_FLIP,
    payload: id,
  }),
  setSecondFlip: (id: number) => ({
    type: types.SET_SECOND_FLIP,
    payload: id,
  }),
  disableCards: () => ({
    type: types.SET_DISABLED,
  }),
  resetFlips: () => ({
    type: types.RESET_FLIPS,
  }),
  flipUnmatchedCards: () => ({
    type: types.FLIP_UNMATCHED_CARDS,
  }),
};
