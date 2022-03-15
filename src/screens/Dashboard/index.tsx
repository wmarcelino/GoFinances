import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { Icon, ProfileGreetingContainer, ProfilePhoto } from "./styles";

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
import { DataListProps, HightLightData, initialHightLightData } from "./types";
import { collectionKey } from "../Register";

export const Dashboard = (): JSX.Element => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [hightLightData, setHightLataData] = useState<HightLightData>(
    initialHightLightData
  );

  const loadTransactions = async () => {
    const response = await AsyncStorage.getItem(collectionKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    console.log("transactions", transactions);

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

    setHightLataData({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        LastTransaction: undefined,
      },
      expensives: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        LastTransaction: undefined,
      },
      total: {
        total: (entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        LastTransaction: undefined,
      },
    });
    setTransactions(transactionsFormatted);
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
          lastTransaction="Última entrada dia 30 de Dezembro"
          type="up"
        />
        <HighlightCard
          title="Saidas"
          amount={hightLightData.expensives.total}
          lastTransaction="Última saida dia 04 de Dezembro"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount={hightLightData.total.total}
          lastTransaction="01 à 30 de Dezembro"
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
