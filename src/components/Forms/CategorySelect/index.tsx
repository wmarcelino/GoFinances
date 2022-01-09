import React from "react";
import { Category, Container, Icon } from "./styles";
import { Props } from "./types";

export const CategorySelect = ({ title }: Props): JSX.Element => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
