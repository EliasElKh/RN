import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
  error: {
    color: '#e74c3c',
    fontSize: moderateScale(13),
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(2),
  },
});

export const darkContainerStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#2c3e50',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
  error: {
    color: '#e74c3c',
    fontSize: moderateScale(13),
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(2),
  },
});
