import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";
import { TouchableOpacity, Alert } from "react-native";

import { State } from "../../store/reducers";
import {
  FlipCardState,
  Card as CardProps,
} from "../../store/reducers/flipcards";
import { actions as flipActions } from "../../store/actions/flipcards";

import { ScoreState } from "../../store/reducers/score";
import { actions as scoreActions } from "../../store/actions/score";

import Card from "../../components/Card";
import Score from "../../components/Score";

const CardGame = () => {
  const dispatch = useDispatch();

  const { data, firstFlip, secondFlip, complete } = useSelector<
    State,
    FlipCardState
  >((s) => s.flipcard);

  React.useEffect(() => {
    if (complete) {
      Alert.alert(
        "Congratulation",
        `You have finished this game in ${steps} steps`,
        [{ text: "Play Again!", onPress: onClickRestart }]
      );
    }
  }, [complete]);

  const { steps } = useSelector<State, ScoreState>((s) => s.score);

  React.useEffect(() => {
    dispatch(flipActions.getRandomCardValues());
  }, []);

  const [timeOutId, setTimeOutId] = React.useState<number>(0);

  React.useEffect(() => {
    if (firstFlip && secondFlip) {
      if (firstFlip.value !== secondFlip.value) {
        setTimeOutId(
          setTimeout(() => {
            flipUnmatchCards();
          }, 1000)
        );
      } else {
        disableCards();
      }
    }
  }, [firstFlip, secondFlip]);

  const handleOnClick = (data: CardProps) => {
    if (!data.flipped) {
      if (!firstFlip) {
        dispatch(flipActions.setFirstFlip(data.id));
      } else if (!secondFlip) {
        dispatch(flipActions.setSecondFlip(data.id));
      } else {
        clearTimeout(timeOutId);
        flipUnmatchCards();
        dispatch(flipActions.setFirstFlip(data.id));
        setTimeOutId(0);
      }
      dispatch(scoreActions.incrementScore());
    }
  };

  const flipUnmatchCards = () => {
    dispatch(flipActions.flipUnmatchedCards());
    dispatch(flipActions.resetFlips());
  };
  const disableCards = () => {
    dispatch(flipActions.disableCards());
    dispatch(flipActions.resetFlips());
  };

  const onClickRestart = () => {
    dispatch(flipActions.getRandomCardValues());
    dispatch(scoreActions.resetScore());
  };

  return (
    <Container>
      <ScoreContainer>
        <TouchableOpacity onPress={onClickRestart}>
          <TextButton>Restart</TextButton>
        </TouchableOpacity>
        <Score points={steps} />
      </ScoreContainer>
      {data.map((data) => (
        <InnerContainer key={data.id}>
          <Card
            testID={`item_${data.id}`}
            data={{ front: "?", back: String(data.value) }}
            flip={data.flipped}
            onClick={() => handleOnClick(data)}
            enabled={data.enabled}
          />
        </InnerContainer>
      ))}
    </Container>
  );
};

export default CardGame;

const Container = styled.SafeAreaView`
  background-color: grey;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ScoreContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 16px;
`;

const TextButton = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: 400;
`;

const InnerContainer = styled.View`
  height: 23%;
  width: 32.33%;
  padding: 2px;
`;
