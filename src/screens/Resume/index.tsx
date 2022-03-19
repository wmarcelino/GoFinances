import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../components/HistoryCard";

import { Container, Header, Title, Content } from "./styles";
import { collectionKey } from "../Register";
import { TransactionCardData } from "../../components/TransactionCard/types";
import { categories } from "../../utils/categories";
import { CategoryData } from "./types";

export const Resume = (): JSX.Element => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const loadData = async () => {
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expansives = responseFormatted.filter(
      (expensive: TransactionCardData) => expensive.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;
      expansives.forEach((expensive: TransactionCardData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const amount = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategory.push({
          name: category.name,
          color: category.color,
          key: category.key,
          amount,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.amount}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
};
