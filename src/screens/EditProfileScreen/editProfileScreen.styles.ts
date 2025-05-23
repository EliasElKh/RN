import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    marginTop: moderateScale(30),
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    width: 120,
    height: 120,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
  },
  placeholderText: {
    color: '#777',
  },
  imageWrapper: {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
},
loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',
  borderRadius: 100,
},
backButton: {
    padding: moderateScale(10),
    position: 'absolute',
    top: moderateScale(10),
    left: moderateScale(10),
    zIndex: 1,
  },
  errorText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },

});

export const darkScreenStyles = {
  ...styles,
  errorText: {
    ...styles.errorText,
    color: 'white',
  },
  container: {
    ...styles.container,
    backgroundColor: '#000',
  },
  title: {
    ...styles.title,
    color: '#fff',
  },
  placeholderText: {
    ...styles.placeholderText,
    color: '#aaa',
  },
};
