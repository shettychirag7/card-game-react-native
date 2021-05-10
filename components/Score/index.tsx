import React from "react";
import styled from "styled-components/native";
import { ViewProps } from "react-native";

export interface ScoreProps extends ViewProps {
  points: number;
}

const Score = ({ points, testID }: ScoreProps) => {
  return (
    <Container testID={testID}>
      <Text>Steps: </Text>
      <Text>{points}</Text>
    </Container>
  );
};

export default Score;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: space-between;
`;

const Text = styled.Text`
  font-size: 22px;
  font-weight: 500;
  color: white;
`;
