import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionTypes,
} from "./styles";

export const Register = (): JSX.Element => {
  const [transactionType, setTransactionType] = useState("");

  const handleTransactionTypeSelect = (type: "up" | "down"): void => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title> Cadastro </Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionButton
              title="Income"
              type="up"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>
          <CategorySelect title="Categoria" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
