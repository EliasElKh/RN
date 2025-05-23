import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';

export const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(16),
  },
  text: {
    color: 'red',
    marginTop: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
});
export const darkContainerStyles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(16),
  },
  text: {
    color: '#FF6347',
    marginTop: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
});
