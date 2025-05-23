import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { scaleFont } from '../../utils/fontScaling';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: moderateScale(12),

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  loginText: {
    color: 'black',
    marginTop: moderateScale(16),
    textAlign: 'center',
  },
  loginLink: {
    color: '#4DA6FF',
    fontWeight: 'bold',
  },
  header: {
    fontSize: scaleFont(28),
    fontWeight: 'bold',
    marginBottom: moderateScale(30),
    textAlign: 'center',
    fontFamily: 'ComicRelief-Regular',
  },
  scrollview:{
    flex: 1,
  },
  contentContaienr:{
    flexGrow: 1,
  },
});
export const darkScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  container: {
    backgroundColor: '#34495e',
    width: '100%',
    borderRadius: moderateScale(12),

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  loginText: {
    color: '#ecf0f1',
    marginTop: moderateScale(16),
    textAlign: 'center',
  },
  loginLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  header: {
    fontSize: scaleFont(28),
    fontWeight: 'bold',
    marginBottom: moderateScale(30),
    textAlign: 'center',
    color: '#ecf0f1',
    fontFamily: 'ComicRelief-Regular',
  },
  scrollview:{
    flex: 1,
  },
  contentContaienr:{
    flexGrow: 1,
  },
});

