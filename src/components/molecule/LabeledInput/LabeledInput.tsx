import React from 'react';
import { View } from 'react-native';
import { Label } from '../../atoms/Label';
import { Input } from '../../atoms/Input';
import { styles as light} from './labeledInput.styles';
import { LabeledInputProps } from './labeledInput.types';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { darkContainerStyles } from './labeledInput.styles';


export const LabeledInput: React.FC<LabeledInputProps> = ({

  label,
  value,
  onChangeText,
  secureTextEntry = false,
  isError = false,
}) => {
  const {theme } = useTheme();
            const styles = theme === 'dark' ? darkContainerStyles : light;
  return(
  <View style={styles.container}>
    <Label text={label} />
    <Input
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      isError={isError}
    />
  </View>
);
};
