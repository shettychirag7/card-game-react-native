import React from "react";
import { Animated } from "react-native";

interface FlipAnimationProps {
  /**
   * animation duration. Default is 200.
   */
  duration?: number;
}
/**
 * A custom hook for showing flip animation
 * @returns an object with frontAnimatedStyle & backAnimatedStyle for
 *          animation style on Views and showFront & showBack callbacks to
 *          toggle the animated state
 */
const useFlipAnimation = ({ duration = 200 }: FlipAnimationProps) => {
  const animatedValue = React.useMemo(() => new Animated.Value(0), []);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const showFront = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const showBack = () => {
    Animated.timing(animatedValue, {
      toValue: 180,
      duration,
      useNativeDriver: false,
    }).start();
  };

  return {
    frontAnimatedStyle,
    backAnimatedStyle,
    showFront,
    showBack,
  };
};

export default useFlipAnimation;
