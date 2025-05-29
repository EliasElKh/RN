import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles as light} from './Button.styles.ts';
import { ButtonProps } from './button.types';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { darkButtonStyles } from './Button.styles.ts';

export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, testID }) => {
  const {theme } = useTheme();
      const styles = theme === 'dark' ? darkButtonStyles : light;
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
