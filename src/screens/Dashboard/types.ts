import { TransactionCardData } from "../../components/TransactionCard/types";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export interface HightLightProps {
  total: string;
  LastTransaction: Date | undefined;
}
export interface HightLightData {
  entries: HightLightProps;
  expensives: HightLightProps;
  total: HightLightProps;
}

export const initialHightLightData: HightLightData = {
  entries: {
    total: "0.00",
    LastTransaction: undefined,
  },
  expensives: {
    total: "0.00",
    LastTransaction: undefined,
  },
  total: {
    total: "0.00",
    LastTransaction: undefined,
  },
};
