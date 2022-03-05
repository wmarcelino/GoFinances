import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { Icon, ProfileGreetingContainer, ProfilePhoto } from "./styles";

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

import { data } from "./types";

export const Dashboard = (): JSX.Element => {
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
