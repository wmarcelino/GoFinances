import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";

import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { collectionKey } from "../Register";
import { TransactionCardData } from "../../components/TransactionCard/types";
import { categories } from "../../utils/categories";
import { CategoryData } from "./types";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components";

export const Resume = (): JSX.Element => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  const loadData = async () => {
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expansives = responseFormatted.filter(
      (expensive: TransactionCardData) => expensive.type === "negative"
    );

    const expansivesTotal = expansives.reduce(
      (acumlator: number, expensive: TransactionCardData) => {
        return (acumlator += Number(expensive.amount));
      },
      0
    );

    console.log("expansivesTotal", expansivesTotal);

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

        const percent =
          ((categorySum / expansivesTotal) * 100).toFixed(0) + "%";

        totalByCategory.push({
          name: category.name,
          color: category.color,
          key: category.key,
          amount: categorySum,
          amountFormatted: amount,
          percent,
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="amount"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.amountFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
};
