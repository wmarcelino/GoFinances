import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { DataListProps } from "./types";
import { FlatList, FlatListProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(38)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-right: 43px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const ProfileImageContainer = styled.View``;

export const ProfilePhoto = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const ProfileGreetingContainer = styled.View`
  margin-left: 17px;
`;

export const ProfileGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ProfileUsername = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(16)}px;
`;

export const TransactionsList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 16 },
})``;
