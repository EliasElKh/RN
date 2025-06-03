import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  image: {
    height: moderateScale(300),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  title: {
    width: '60%',
    height: 22,
    borderRadius: 4,
    marginTop: moderateScale(10),
  },
  description: {
    width: '90%',
    height: 16,
    borderRadius: 4,
    marginTop: moderateScale(5),
  },
  price: {
    width: '25%',
    height: 18,
    borderRadius: 4,
    marginTop: moderateScale(5),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  button: {
    flex: 1,
    height: 36,
    borderRadius: 4,
  },
  buttonMarginRight: {
    marginRight: moderateScale(5),
  },
  buttonMarginLeft: {
    marginLeft: moderateScale(5),
  },
});

