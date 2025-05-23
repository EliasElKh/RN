import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { scaleFont } from '../../utils/fontScaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
    fontFamily: 'ComicRelief-Regular',
  },
  error: {
    color: 'red',
    marginTop: moderateScale(5),
    fontSize: scaleFont(12),
    fontFamily: 'ComicRelief-Regular',
  },
});
export const darkScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: '#2c3e50',
  },
  header: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  error: {
    color: '#e74c3c',
    marginTop: moderateScale(5),
    fontSize: scaleFont(12),
    fontFamily: 'ComicRelief-Regular',
  },
});
