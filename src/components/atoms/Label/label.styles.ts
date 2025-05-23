
import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';
import { scaleFont } from '../../../utils/fontScaling';

export const styles = StyleSheet.create({
  label: {
    marginBottom: moderateScale(5),
    fontWeight: '600',
    fontSize: scaleFont(14),
    color: '#2c3e50',
    fontFamily: 'ComicRelief-Regular',
  },
});
export const darkLabelStyles = StyleSheet.create({
  label: {
    marginBottom: moderateScale(5),
    fontWeight: '600',
    fontSize: scaleFont(14),
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',

  },
});

