import { TransactionCardData } from "../../components/TransactionCard/types";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export const data: DataListProps[] = [
  {
    id: "1",
    title: "Desenvolvimento de site",
    amount: "R$12.000,00",
    category: { name: "Vendas", icon: "dollar-sign" },
    date: "30/12/2021",
    type: "positive",
  },
  {
    id: "2",
    title: "Pizza",
    amount: "R$17,00",
    category: { name: "Alimentação", icon: "coffee" },
    date: "30/12/2021",
    type: "negative",
  },
  {
    id: "3",
    title: "Aluguel",
    amount: "R$1.000,00",
    category: { name: "Casa", icon: "shopping-bag" },
    date: "30/12/2021",
    type: "positive",
  },
  {
    id: "4",
    title: "Uber",
    amount: "R$12,56",
    category: { name: "Transporte", icon: "shopping-bag" },
    date: "30/12/2021",
    type: "negative",
  },
];
