export interface Props {
  data: TransactionCardData;
}

export interface TransactionCardData {
  type: "negative" | "positive";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface TransactionProps {
  type: "negative" | "positive";
}
