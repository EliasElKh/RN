import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';
import { scaleFont } from '../../../utils/fontScaling';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: moderateScale(24),
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    fontFamily: 'ComicRelief-Regular',
  },
  inputBox: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderWidth: 2,
    borderRadius: moderateScale(14),
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: scaleFont(24),
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#fdfdfd',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowRadius: moderateScale(6),
    elevation: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
  inputBoxError: {
    borderColor: '#ff4d4f',
  },
  error: {
    color: '#ff4d4f',
    fontSize: scaleFont(13),
    fontWeight: '500',
    marginTop: moderateScale(-10),
    fontFamily: 'ComicRelief-Regular',
  },
});

export const darkInputBoxStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: moderateScale(24),
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    fontFamily: 'ComicRelief-Regular',
  },
  inputBox: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderWidth: 2,
    borderRadius: moderateScale(14),
    borderColor: '#7f8c8d',
    textAlign: 'center',
    fontSize: scaleFont(24),
    fontWeight: '600',
    color: '#ecf0f1',
    backgroundColor: '#34495e',
    shadowColor: '#fff',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowRadius: moderateScale(6),
    elevation: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
  inputBoxError: {
    borderColor: '#e74c3c',
  },
  error: {
    color: '#e74c3c',
    fontSize: scaleFont(13),
    fontWeight: '500',
    marginTop: moderateScale(-10),
    fontFamily: 'ComicRelief-Regular',
  },
});
