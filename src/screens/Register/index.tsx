import React, { useState, useEffect } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { CategorySelect } from "../CategorySelect";
import { Category } from "../CategorySelect/types";
import { useForm } from "react-hook-form";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionTypes,
} from "./styles";

const collectionKey = "@gofinances:transactions";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export const Register = (): JSX.Element => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  const handleTransactionTypeSelect = (type: "up" | "down"): void => {
    setTransactionType(type);
  };

  const handleCloseSelectCategory = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategory = () => {
    setCategoryModalOpen(true);
  };

  const handleCategoryPress = (category: Category) => {
    setCategory(category);
  };

  const handleRegister = async (form: FormData) => {
    console.log("teste teste");

    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    try {
      await AsyncStorage.setItem(collectionKey, JSON.stringify(data));
    } catch (error) {
      console.log(error);
      Alert.alert("Nãp foi possível salvar");
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem(collectionKey);
      console.log("data", JSON.stringify(data));
    };

    loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title> Cadastro </Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCorrect={false}
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
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
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={handleCategoryPress}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
