import scoreReducer from "../";
import { types } from "../../../actions/score";

describe("Score reducer test", () => {
  it("sets default state to zero", () => {
    const expected = scoreReducer(undefined, { type: "DEFAULT" });
    expect(expected.steps).toEqual(0);
  });
  it("increments steps", () => {
    const expected = scoreReducer(
      { steps: 5 },
      { type: types.INCREMENT_SCORE }
    );
    expect(expected.steps).toEqual(6);
  });
  it("resets steps", () => {
    const expected = scoreReducer({ steps: 5 }, { type: types.RESET_SCORE });
    expect(expected.steps).toEqual(0);
  });
});
