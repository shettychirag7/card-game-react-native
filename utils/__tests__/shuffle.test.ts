import { shuffle } from "../";

describe("shuffle array test", () => {
  it("shuffles the array without affecting original size", () => {
    const actual = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
    expect(actual.length).toEqual(12);
  });
});
