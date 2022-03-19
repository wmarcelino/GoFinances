import React from "react";

import { Container, Title, Amount } from "./styles";
import { Props } from "./types";

export const HistoryCard = ({ color, title, amount }: Props): JSX.Element => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
