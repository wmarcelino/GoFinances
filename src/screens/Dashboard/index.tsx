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
import { DataListProps } from "./types";
import { collectionKey } from "../Register";

export const Dashboard = (): JSX.Element => {
  const [data, setData] = useState<DataListProps[]>([]);

  const loadTransactions = async () => {
    const response = await AsyncStorage.getItem(collectionKey);

    const transactions = response ? JSON.parse(response) : [];

    console.log("transactions", transactions);

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
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

    setData(transactionsFormatted);
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
          amount="R$ 17.40,00"
          lastTransaction="Última entrada dia 30 de Dezembro"
          type="up"
        />
        <HighlightCard
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Última saida dia 04 de Dezembro"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 30 de Dezembro"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title> Listagem </Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
