import React from "react";
import { Container, Title, Icon } from "./styles";
import { icons, Props } from "./types";

export const TransactionButton = ({
  title,
  type,
  isActive,
  ...props
}: Props): JSX.Element => {
  return (
    <Container isActive={isActive} type={type} {...props}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
