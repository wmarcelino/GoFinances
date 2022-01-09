import React from "react";
import { Container } from "./styles";
import { Props } from "./types";

export const Input = ({ ...props }: Props): JSX.Element => {
  return <Container {...props} />;
};
