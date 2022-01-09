import { TouchableOpacityProps } from "react-native";
export interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

export const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export interface IconProps {
  type: "up" | "down";
}

export interface ButtonProps {
  isActive: boolean;
  type: "down" | "up";
}
