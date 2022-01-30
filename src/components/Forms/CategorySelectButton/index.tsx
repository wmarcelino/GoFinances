import React from "react";
import { Container, Category, Icon } from "./styles";
import { Props } from "./types";

export const CategorySelectButton = ({
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
