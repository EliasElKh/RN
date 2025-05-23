import { Text } from 'react-native';
import { styles as light } from './label.styles';
import { LabelProps } from './label.types';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { darkLabelStyles } from './label.styles';

export const Label: React.FC<LabelProps> = ({ text }) => {
  const {theme } = useTheme();
        const styles = theme === 'dark' ? darkLabelStyles : light;
  return <Text style={styles.label}>{text}</Text>;
};
