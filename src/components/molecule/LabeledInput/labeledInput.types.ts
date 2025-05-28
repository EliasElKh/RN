export type LabeledInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    isError?: boolean;
    placeholder?: string;
  };
