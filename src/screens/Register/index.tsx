import React, { useState, useEffect } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { CategorySelect } from "../CategorySelect";
import { Category } from "../CategorySelect/types";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesParamList } from "../../routes/app.routes";

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

export type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Cadastrar"
>;
export const collectionKey = "@gofinances:transactions";

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

  const navigation = useNavigation<RegisterNavigationProps>();

  const handleTransactionTypeSelect = (type: "positive" | "negative"): void => {
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

    const newData = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(collectionKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newData];

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Nãp foi possível salvar");
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
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
