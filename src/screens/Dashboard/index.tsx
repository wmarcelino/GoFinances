import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import {
  Icon,
  LoadContainer,
  ProfileGreetingContainer,
  ProfilePhoto,
} from "./styles";

import { useFocusEffect } from "@react-navigation/native";
import {
  Container,
  Header,
  ProfileContainer,
  ProfileImageContainer,
  ProfileUsername,
  ProfileGreeting,
  HeaderContainer,
  HighlightCards,
  Title,
  Transactions,
  TransactionsList,
  LogoutButton,
} from "./styles";

import { useTheme } from "styled-components";
import { DataListProps, HightLightData, initialHightLightData } from "./types";
import { collectionKey } from "../Register";
import { ActivityIndicator } from "react-native";

export const Dashboard = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [hightLightData, setHightLataData] = useState<HightLightData>(
    initialHightLightData
  );

  const theme = useTheme();
  const loadTransactions = async () => {
    const response = await AsyncStorage.getItem(collectionKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else if (item.type === "negative") {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = new Date(item.date);
        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(date);

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: dateFormatted,
        };
      }
    );

    /**
     * TODO: Transformar código abaixo em uma funcao
     * TODO: Colocar mes por extenso
     */
    const lastTransactionsEntriesFormatted = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(
      new Date(
        Math.max.apply(
          Math,
          transactions
            .filter(
              (transaction: DataListProps) => transaction.type === "positive"
            )
            .map((transaction: DataListProps) =>
              new Date(transaction.date).getTime()
            )
        )
      )
    );

    const lastTransactionsExpansivesFormatted = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(
      new Date(
        Math.max.apply(
          Math,
          transactions
            .filter(
              (transaction: DataListProps) => transaction.type === "negative"
            )
            .map((transaction: DataListProps) =>
              new Date(transaction.date).getTime()
            )
        )
      )
    );
    setHightLataData({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        LastTransaction:
          "Última entrada dia " + lastTransactionsEntriesFormatted,
      },
      expensives: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        LastTransaction:
          "Última entrada dia " + lastTransactionsExpansivesFormatted,
      },
      total: {
        total: (entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        LastTransaction:
          "Última entrada dia " + lastTransactionsExpansivesFormatted,
      },
    });
    setTransactions(transactionsFormatted);

    setIsLoading(false);
  };

  /**
   *  Responsável por carregar a listagem de transacoes.
   */
  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
        <HeaderContainer>
          <ProfileContainer>
            <ProfileImageContainer>
              <ProfilePhoto
                source={{
                  uri: "https://avatars.githubusercontent.com/u/7582259?v=4",
                }}
              />
            </ProfileImageContainer>
            <ProfileGreetingContainer>
              <ProfileGreeting>Olá </ProfileGreeting>
              <ProfileUsername>Wesley </ProfileUsername>
            </ProfileGreetingContainer>
          </ProfileContainer>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </HeaderContainer>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount={hightLightData.entries.total}
          lastTransaction={hightLightData.entries.LastTransaction}
          type="up"
        />
        <HighlightCard
          title="Saidas"
          amount={hightLightData.expensives.total}
          lastTransaction={hightLightData.expensives.LastTransaction}
          type="down"
        />
        <HighlightCard
          title="Total"
          amount={hightLightData.total.total}
          lastTransaction={hightLightData.total.LastTransaction}
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title> Listagem </Title>
        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
