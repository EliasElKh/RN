import { GestureResponderEvent } from 'react-native';

export type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: object;
  variant?: string;
  textStyle?: object;
  loading?: boolean;
};
