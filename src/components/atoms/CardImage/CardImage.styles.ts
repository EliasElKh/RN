import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';

export const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: moderateScale(200),
    borderRadius: moderateScale(8),
    },
  });
  export const darkImageStyles = StyleSheet.create({
    image: {
      width: '100%',
      height: moderateScale(200),
      borderRadius: moderateScale(8),
    },
  });
