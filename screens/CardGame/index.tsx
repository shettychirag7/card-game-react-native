import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";

import { State } from "../../store/reducers";
import {
  FlipCardState,
  Card as CardProps,
} from "../../store/reducers/flipcards";
import { actions as flipActions } from "../../store/actions/flipcards";

import Card from "../../components/Card";

const CardGame = () => {
  const dispatch = useDispatch();

  const { data, firstFlip, secondFlip } = useSelector<State, FlipCardState>(
    (s) => s.flipcard
  );

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

  return (
    <Container>
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

const InnerContainer = styled.View`
  height: 23%;
  width: 32.33%;
  padding: 2px;
`;
