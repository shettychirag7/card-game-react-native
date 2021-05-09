import React from "react";
import useFlipAnimation from "../useFlipAnimation";
import { render } from "@testing-library/react-native";

const HookTestComponent = ({ callback }: { callback?: () => void }) => {
  callback?.();
  return null;
};

describe("useFlipAnimation hook tests", () => {
  let frontAnimatedStyle: any;
  let backAnimatedStyle: any;
  let showFront: any;
  let showBack: any;

  beforeEach(() => {
    render(
      <HookTestComponent
        callback={() => {
          const received = useFlipAnimation({ duration: 200 });
          frontAnimatedStyle = received.frontAnimatedStyle;
          backAnimatedStyle = received.backAnimatedStyle;
          showFront = received.showFront;
          showBack = received.showBack;
        }}
      />
    );
  });

  afterEach(() => {
    frontAnimatedStyle = undefined;
    backAnimatedStyle = undefined;
    showFront = undefined;
    showBack = undefined;
  });

  it("hook returned values are defined", () => {
    expect(frontAnimatedStyle).toBeDefined();
    expect(backAnimatedStyle).toBeDefined();
    expect(showFront).toBeDefined();
    expect(showBack).toBeDefined();
  });
});
