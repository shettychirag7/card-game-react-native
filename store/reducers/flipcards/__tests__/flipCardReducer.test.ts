import flipCardReducer from "../";
import * as shuffle from "../../../../utils/shuffle";
import * as random from "../../../../utils/random";
import { types } from "../../../actions/flipcards";

describe("flipCardReducer tests", () => {
  const randomPairSpy = jest.spyOn(random, "randomPair");
  const shuffleSpy = jest.spyOn(shuffle, "shuffle");

  beforeEach(() => {
    const mockArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    randomPairSpy.mockReturnValue(mockArr);
    shuffleSpy.mockReturnValue(mockArr);
  });
  afterEach(() => {
    randomPairSpy.mockClear();
    shuffleSpy.mockClear();
  });
  it("sets initial state correctly", () => {
    const actual = flipCardReducer(undefined, { type: "DEFAULT" });
    expect(actual.data).toHaveLength(0);
    expect(actual.firstFlip).toBeUndefined();
    expect(actual.secondFlip).toBeUndefined();
  });
  it("must generate random pair array and assign it to data state along with following properties: enabled, flipped, id, value", () => {
    const actual = flipCardReducer(undefined, {
      type: types.GENERATE_RANDOM_CARD_VALUES,
    });

    expect(actual.data).toHaveLength(12);
    expect(actual.data[0].enabled).toEqual(true);
    expect(actual.data[0].flipped).toEqual(false);
    expect(actual.data[0].id).toEqual(0);
    expect(actual.data[0].value).toEqual(1);
  });
  it("must set first flip state correctly and update flipped boolean to true in data array", () => {
    const actual = flipCardReducer(
      { data: [{ id: 0, flipped: false, enabled: true, value: 1 }] },
      {
        type: types.SET_FIRST_FLIP,
        payload: 0,
      }
    );
    expect(actual.firstFlip).toBeDefined();
    expect(actual.firstFlip?.flipped).toEqual(true);

    expect(actual.data[0].flipped).toEqual(true);
  });
  it("must set second flip state correctly and update flipped boolean to true in data array", () => {
    const actual = flipCardReducer(
      { data: [{ id: 0, flipped: false, enabled: true, value: 1 }] },
      {
        type: types.SET_SECOND_FLIP,
        payload: 0,
      }
    );
    expect(actual.secondFlip).toBeDefined();
    expect(actual.secondFlip?.flipped).toEqual(true);

    expect(actual.data[0].flipped).toEqual(true);
  });
  it("sets firstFlip and secondFlip to undefined when reset flip action passed", () => {
    const actual = flipCardReducer(
      {
        data: [],
        firstFlip: { id: 0, flipped: false, enabled: true, value: 1 },
        secondFlip: { id: 0, flipped: false, enabled: true, value: 1 },
      },
      {
        type: types.RESET_FLIPS,
      }
    );
    expect(actual.firstFlip).not.toBeDefined();
    expect(actual.secondFlip).not.toBeDefined();
  });
  it("sets enabled to false when disable action is dispatched and firstFlip is set", () => {
    const actual = flipCardReducer(
      {
        data: [
          { id: 0, flipped: false, enabled: true, value: 1 },
          { id: 1, flipped: false, enabled: true, value: 2 },
        ],
        firstFlip: { id: 0, flipped: false, enabled: true, value: 1 },
      },
      {
        type: types.SET_DISABLED,
      }
    );
    expect(actual.data[0].enabled).toEqual(false);
  });
  it("sets enabled to false when disable action is dispatched and secondFlip is set", () => {
    const actual = flipCardReducer(
      {
        data: [
          { id: 0, flipped: false, enabled: true, value: 1 },
          { id: 1, flipped: false, enabled: true, value: 2 },
        ],
        secondFlip: { id: 0, flipped: false, enabled: true, value: 1 },
      },
      {
        type: types.SET_DISABLED,
      }
    );
    expect(actual.data[0].enabled).toEqual(false);
  });
  it("flips unmatched card by setting flipped to false when flip unmatched cards is dispatched", () => {
    const actual = flipCardReducer(
      {
        data: [
          { id: 0, flipped: true, enabled: true, value: 1 },
          { id: 1, flipped: true, enabled: true, value: 2 },
          { id: 2, flipped: false, enabled: true, value: 3 },
        ],
        firstFlip: { id: 0, flipped: true, enabled: true, value: 1 },
        secondFlip: { id: 1, flipped: true, enabled: true, value: 2 },
      },
      {
        type: types.FLIP_UNMATCHED_CARDS,
      }
    );
    expect(actual.data[0].flipped).toEqual(false);
    expect(actual.data[1].flipped).toEqual(false);
  });
});
