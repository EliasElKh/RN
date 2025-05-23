import { StyleProp, TextStyle } from 'react-native';

export interface Props {
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    isError?: boolean;
    keyboardType?: string;
    maxLength?: number;
    placeholder?: string;
    style?: StyleProp<TextStyle>;
    multiline?: boolean;
    error?: string;
  }
