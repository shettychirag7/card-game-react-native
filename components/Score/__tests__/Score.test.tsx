import React from "react";
import { render } from "@testing-library/react-native";

import Score from "../";

describe("Score component tests", () => {
  it("renders component with score text and points", () => {
    const { getByTestId } = render(<Score points={5} testID="mock" />);
    expect(getByTestId("mock")).toHaveTextContent("Score");
    expect(getByTestId("mock")).toHaveTextContent("5");
  });
});
