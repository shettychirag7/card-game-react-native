import React from "react";
import styled from "styled-components/native";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import useFlipAnimation from "./useFlipAnimation";

export interface CardProps extends ViewProps {
  /**
   * object to set content on front face and back face
   */
  data: {
    /**
     * set front face content
     */
    front: string;
    /**
     * set back face content
     */
    back: string;
  };

  /**
   * set false to show front face or true to show back face
   */
  flip?: boolean;
  /**
   * callback function to execute on click of card component
   */
  onClick?: () => void;

  enabled?: boolean;
}

const Card = ({ data, flip, enabled, onClick, ...rest }: CardProps) => {
  const {
    frontAnimatedStyle,
    backAnimatedStyle,
    showFront,
    showBack,
  } = useFlipAnimation({ duration: 200 });

  if (flip) {
    showBack();
  } else {
    showFront();
  }

  const onClickCard = () => {
    onClick?.();
  };

  return (
    <View {...rest}>
      <TouchableOpacity onPress={onClickCard} disabled={!enabled}>
        <Animated.View
          style={[styles.card, styles.backCard, backAnimatedStyle]}
          testID="back"
        >
          <Text style={[styles.text]}>{data.back}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.frontCard, frontAnimatedStyle]}
          testID="front"
        >
          <Text style={[styles.text]}>{data.front}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  backCard: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
  },
  frontCard: {
    backgroundColor: "blue",
    backfaceVisibility: "hidden",
  },
  card: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 4,
  },
  text: {
    fontSize: 22,
  },
});

const Text = styled.Text`
  color: white;
`;
