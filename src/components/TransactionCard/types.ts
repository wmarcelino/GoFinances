export interface Category {
  name: string;
  icon: string;
}

export interface Props {
  data: TransactionCardData;
}

export interface TransactionCardData {
  type: "negative" | "positive";
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export interface TransactionProps {
  type: "negative" | "positive";
}
