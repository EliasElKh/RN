import React from 'react';
import { TextInput } from 'react-native';
import { styles as light} from './input.styles';
import { Props } from './input.types';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { darkInputStyles } from './input.styles';


export const Input: React.FC<Props> = ({ value, onChangeText, secureTextEntry = false, isError }) => {
  const {theme } = useTheme();
          const styles = theme === 'dark' ? darkInputStyles : light;
  return (
    <TextInput
      style={[styles.input, isError && styles.errorBorder]}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
    />
  );
};
