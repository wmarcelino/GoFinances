import React from "react";
import { FlatList } from "react-native";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
  ButtonText,
} from "./styles";
import { Props } from "./types";

import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import { Category as ICategory } from "./types";
export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: Props): JSX.Element => {
  const handleCategorySelect = (category: ICategory) => {
    setCategory(category);
  };

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory}>
          <ButtonText>Selecionar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};
