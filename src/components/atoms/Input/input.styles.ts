
import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';
import { scaleFont } from '../../../utils/fontScaling';

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
    fontSize: scaleFont(16),
    color: '#2d3436',
    backgroundColor: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  errorBorder: {
    borderColor: '#e74c3c',
  },
});
export const darkInputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
    fontSize: scaleFont(16),
    color: '#ecf0f1',
    backgroundColor: '#2c3e50',
    fontFamily: 'ComicRelief-Regular',
  },
  errorBorder: {
    borderColor: '#e74c3c',
  },
});
