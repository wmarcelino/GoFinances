import React from "react";

import { Container, Title } from "./styles";
import { Props } from "./types";

export const Button = ({ title, ...props }: Props): JSX.Element => {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
};
