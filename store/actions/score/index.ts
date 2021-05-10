export const types = {
  INCREMENT_SCORE: "INCREMENT_SCORE",
  RESET_SCORE: "RESET_SCORE",
};

export const actions = {
  incrementScore: () => ({
    type: types.INCREMENT_SCORE,
  }),
  resetScore: () => ({
    type: types.RESET_SCORE,
  }),
};
