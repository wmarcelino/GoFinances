import React, { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";

import { addMonths, format } from "date-fns";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";
import { collectionKey } from "../Register";
import { TransactionCardData } from "../../components/TransactionCard/types";
import { categories } from "../../utils/categories";
import { CategoryData } from "./types";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { subMonths } from "date-fns/esm";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const Resume = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  const loadData = async () => {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expansives = responseFormatted.filter(
      (expensive: TransactionCardData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expansivesTotal = expansives.reduce(
      (acumlator: number, expensive: TransactionCardData) => {
        return (acumlator += Number(expensive.amount));
      },
      0
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

    setIsLoading(false);
  };

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  //TODO: Preservar estado do header.
  if (isLoading) {
    return (
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange("prev")}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>
            {format(selectedDate, "MMMM, yyyy", {
              locale: ptBR,
            })}
          </Month>

          <MonthSelectButton onPress={() => handleDateChange("next")}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

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
