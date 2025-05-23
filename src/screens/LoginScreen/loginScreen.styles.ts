import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { scaleFont } from '../../utils/fontScaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    padding: moderateScale(20),
    justifyContent: 'center',
    fontFamily: 'ComicRelief-Regular',
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: moderateScale(5),
    fontFamily: 'ComicRelief-Regular',
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#7f8c8d',
    marginBottom: moderateScale(30),
    fontFamily: 'ComicRelief-Regular',
  },
  signupText: {
    marginTop: moderateScale(20),
    fontSize: scaleFont(14),
    color: '#555',
    fontFamily: 'ComicRelief-Regular',
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontFamily: 'ComicRelief-Regular',
  },
});

export const darkScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    padding: moderateScale(20),
    justifyContent: 'center',
    fontFamily: 'ComicRelief-Regular',
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: '700',
    color: '#ecf0f1',
    marginBottom: moderateScale(5),
    fontFamily: 'ComicRelief-Regular',
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#bdc3c7',
    marginBottom: moderateScale(30),
    fontFamily: 'ComicRelief-Regular',
  },
  signupText: {
    marginTop: moderateScale(20),
    fontSize: scaleFont(14),
    color: '#ccc',
    fontFamily: 'ComicRelief-Regular',
  },
  signupLink: {
    color: '#3498db',
    fontWeight: 'bold',
    fontFamily: 'ComicRelief-Regular',
  },
});

export const additionalStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
