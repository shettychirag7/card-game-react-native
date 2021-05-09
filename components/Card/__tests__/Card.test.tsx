import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import * as useFlipAnimation from "../useFlipAnimation";

import Card from "../";

describe("Card Component Tests", () => {
  it("must render both front and back content", () => {
    const { getByTestId } = render(
      <Card testID="mock" data={{ front: "?", back: "1" }} flip={true} />
    );
    expect(getByTestId("mock")).toHaveTextContent("?");
    expect(getByTestId("mock")).toHaveTextContent("1");
  });

  it("must execute onClick callback on click of card", () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <Card data={{ front: "?", back: "1" }} onClick={mockFn} />
    );
    const element = getByText("?");
    fireEvent.press(element);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("must set backface visibility hidden to front card  and hide back card with position absolute", () => {
    const { getByTestId } = render(
      <Card testID="mock" data={{ front: "?", back: "1" }} flip={false} />
    );
    expect(getByTestId("front")).toHaveStyle({
      backfaceVisibility: "hidden",
    });

    expect(getByTestId("back")).toHaveStyle({
      position: "absolute",
      top: 0,
      left: 0,
    });
  });
  it("must execute showBack hook when flip is true", () => {
    const spy = jest.spyOn(useFlipAnimation, "default");
    const mockFn = jest.fn();
    spy.mockReturnValue({
      showFront: jest.fn(),
      showBack: mockFn,
      frontAnimatedStyle: { transform: [] },
      backAnimatedStyle: { transform: [] },
    });
    const { getByTestId } = render(
      <Card testID="mock" data={{ front: "?", back: "1" }} flip={true} />
    );
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
