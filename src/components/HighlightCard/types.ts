import { LastTransaction } from "./styles";
export interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

export interface TypeProps {
  type: "up" | "down" | "total";
}

export const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};
