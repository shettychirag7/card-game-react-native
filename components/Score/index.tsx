import React from "react";
import styled from "styled-components/native";
import { ViewProps, Text } from "react-native";

export interface ScoreProps extends ViewProps {
  points: number;
}

const Score = ({ points, testID }: ScoreProps) => {
  return (
    <Container testID={testID}>
      <Text>Score</Text>
      <Text>{points}</Text>
    </Container>
  );
};

export default Score;

const Container = styled.View`
  display: flex;
  justify-content: space-between;
`;
