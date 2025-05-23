import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';
import { scaleFont } from '../../../utils/fontScaling';

export const styles = StyleSheet.create({
  shadowContainer: {
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(3) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(6),
    elevation: moderateScale(5),
    fontFamily: 'ComicRelief-Regular',
  },
  inputGroup: {
    marginBottom: moderateScale(15),
    fontFamily: 'ComicRelief-Regular',
  },
  label: {
    fontSize: scaleFont(16),
    marginBottom: moderateScale(5),
    color: '#333',
    fontWeight: '500',
    fontFamily: 'ComicRelief-Regular',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#ccc',
    padding: moderateScale(12),
    fontSize: scaleFont(16),
    fontFamily: 'ComicRelief-Regular',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: scaleFont(12),
    marginTop: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
  switchText: {
    marginTop: moderateScale(20),
    textAlign: 'center',
    fontSize: scaleFont(14),
    color: '#444',
    fontFamily: 'ComicRelief-Regular',
  },
  switchLink: {
    color: '#007bff',
    fontWeight: '600',
    fontFamily: 'ComicRelief-Regular',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
});

export const darkShadowInputStyles = StyleSheet.create({
  shadowContainer: {
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: '#2c3e50',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: moderateScale(3) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(6),
    elevation: moderateScale(5),
    fontFamily: 'ComicRelief-Regular',
  },
  inputGroup: {
    marginBottom: moderateScale(15),
    fontFamily: 'ComicRelief-Regular',
  },
  label: {
    fontSize: scaleFont(16),
    marginBottom: moderateScale(5),
    color: '#ecf0f1',
    fontWeight: '500',
    fontFamily: 'ComicRelief-Regular',
  },
  input: {
    backgroundColor: '#34495e',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#7f8c8d',
    padding: moderateScale(12),
    fontSize: scaleFont(16),
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  error: {
    color: '#e74c3c',
    fontSize: scaleFont(12),
    marginTop: moderateScale(4),
    fontFamily: 'ComicRelief-Regular',
  },
  switchText: {
    marginTop: moderateScale(20),
    textAlign: 'center',
    fontSize: scaleFont(14),
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  switchLink: {
    color: '#3498db',
    fontWeight: '600',
    fontFamily: 'ComicRelief-Regular',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
});
