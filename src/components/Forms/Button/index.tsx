import React from "react";

import { Container, Title } from "./styles";
import { Props } from "./types";

export const Button = ({ title, onPress, ...props }: Props): JSX.Element => {
  return (
    <Container onPress={onPress} {...props}>
      <Title>{title}</Title>
    </Container>
  );
};
