import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';
import { scaleFont } from '../../../utils/fontScaling';


export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    fontFamily: 'ComicRelief-Regular',
  },
  disabled: {
    backgroundColor: '#A0A0A0',
  },
});

export const darkButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    fontFamily: 'ComicRelief-Regular',
  },
  disabled: {
    backgroundColor: '#555',
  },
});

