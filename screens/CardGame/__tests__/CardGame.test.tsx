import React from "react";
import * as reactRedux from "react-redux";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";

import CardGame from "..";
import { actions as flipActions } from "../../../store/actions/flipcards";
import { actions as scoreActions } from "../../../store/actions/score";

describe("Card Game component tests", () => {
  const useSelectorSpy = jest.spyOn(reactRedux, "useSelector");
  const useDispatchSpy = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      data: [],
      firstFlip: undefined,
      secondFlip: undefined,
      score: 5,
    });
  });

  afterEach(() => {
    useSelectorSpy.mockClear();
    useDispatchSpy.mockClear();
  });

  it("dispatches action to generate random list on mount", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    render(<CardGame />);

    expect(mockFn).toHaveBeenCalledWith(flipActions.getRandomCardValues());
  });

  it("must render cards on screen based on the length of data array", () => {
    useSelectorSpy.mockReturnValue({
      data: [
        { id: 0, value: 1, enabled: false, flipped: true },
        { id: 1, value: 2, enabled: false, flipped: true },
      ],
    });
    const { getByTestId } = render(<CardGame />);
    expect(getByTestId("item_0")).toHaveTextContent("1");
    expect(getByTestId("item_1")).toHaveTextContent("2");
  });
  it("must dispatch actions to set first flip when clicked on first card", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    useSelectorSpy.mockReturnValue({
      data: [
        { id: 0, value: 1, enabled: true, flipped: false },
        { id: 1, value: 2, enabled: true, flipped: false },
      ],
    });
    const { getByText } = render(<CardGame />);
    fireEvent.press(getByText("1"));
    expect(mockFn).toHaveBeenCalledWith(flipActions.setFirstFlip(0));
  });
  it("must dispatch actions to set second flip when clicked on second card", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    useSelectorSpy.mockReturnValue({
      data: [
        { id: 0, value: 1, enabled: true, flipped: false },
        { id: 1, value: 2, enabled: true, flipped: false },
      ],
      firstFlip: { id: 0, value: 1, enabled: true, flipped: false },
    });
    const { getByText } = render(<CardGame />);
    fireEvent.press(getByText("2"));
    expect(mockFn).toHaveBeenCalledWith(flipActions.setSecondFlip(1));
  });

  it("must dispatch action to flip first card and second card when their values doesn't match and timer runs out", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    useSelectorSpy.mockReturnValue({
      data: [
        { id: 0, value: 1, enabled: true, flipped: true },
        { id: 1, value: 2, enabled: true, flipped: true },
      ],
      firstFlip: { id: 0, value: 1, enabled: true, flipped: true },
      secondFlip: { id: 1, value: 2, enabled: true, flipped: true },
    });

    render(<CardGame />);

    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledWith(flipActions.flipUnmatchedCards());
    expect(mockFn).toHaveBeenCalledWith(flipActions.resetFlips());
  });
  it("must dispatch action to flip first and second card when their value doesn't match and third card is clicked", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    useSelectorSpy.mockReturnValue({
      data: [
        { id: 0, value: 1, enabled: true, flipped: true },
        { id: 1, value: 2, enabled: true, flipped: true },
        { id: 2, value: 3, enabled: true, flipped: false },
      ],
      firstFlip: { id: 0, value: 1, enabled: true, flipped: true },
      secondFlip: { id: 1, value: 2, enabled: true, flipped: true },
    });

    const { getByText } = render(<CardGame />);
    fireEvent.press(getByText("3"));
    expect(mockFn).toHaveBeenCalledWith(flipActions.flipUnmatchedCards());
    expect(mockFn).toHaveBeenCalledWith(flipActions.resetFlips());
    expect(mockFn).toHaveBeenCalledWith(flipActions.setFirstFlip(2));
  });
  it("must dispatch action to disable clicks on open cards when values of first card and second card matches", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    useSelectorSpy.mockReturnValue({
      data: [
        { id: 0, value: 1, enabled: true, flipped: true },
        { id: 1, value: 1, enabled: true, flipped: true },
      ],
      firstFlip: { id: 0, value: 1, enabled: true, flipped: true },
      secondFlip: { id: 1, value: 1, enabled: true, flipped: true },
    });

    render(<CardGame />);
    expect(mockFn).toHaveBeenCalledWith(flipActions.disableCards());
    expect(mockFn).toHaveBeenCalledWith(flipActions.resetFlips());
  });
  it("must increment score on click card", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);

    useSelectorSpy.mockReturnValue({
      data: [{ id: 0, value: 1, enabled: true, flipped: false }],
    });

    const { getByText } = render(<CardGame />);
    fireEvent.press(getByText("1"));
    expect(mockFn).toHaveBeenCalledWith(scoreActions.incrementScore());
  });
  it("must reset score and shuffle cards on click Restart", () => {
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);

    const { getByText } = render(<CardGame />);
    fireEvent.press(getByText("Restart"));
    expect(mockFn).toHaveBeenCalledWith(scoreActions.resetScore());
    expect(mockFn).toHaveBeenCalledWith(flipActions.getRandomCardValues());
  });
  it("shows pop up on all cards flipped", () => {
    const spy = jest.spyOn(Alert, "alert");
    const mockFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockFn);
    useSelectorSpy.mockReturnValue({
      data: [{ id: 0, value: 1, enabled: true, flipped: false }],
      complete: true,
    });

    render(<CardGame />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
