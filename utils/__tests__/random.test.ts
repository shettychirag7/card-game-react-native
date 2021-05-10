import { randomPair } from "../";

describe("random number generator test", () => {
  it("generates a pair of random numbers", () => {
    const actual = randomPair(6);
    expect(actual.length).toEqual(12);
  });
  it("it generates a unique pair correctly", () => {
    const actual = randomPair(4);
    expect(actual.length).toEqual(8);
    expect(actual[0]).toEqual(actual[4]);
    expect(actual[1]).toEqual(actual[5]);
    expect(actual[2]).toEqual(actual[6]);
    expect(actual[3]).toEqual(actual[7]);
  });
});
