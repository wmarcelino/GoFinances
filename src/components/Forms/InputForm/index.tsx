import React from "react";

import { Container, Error } from "./styles";
import { Input } from "../Input";
import { Props } from "./types";
import { Controller } from "react-hook-form";

export const InputForm = ({ control, name, error, ...props }: Props) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
