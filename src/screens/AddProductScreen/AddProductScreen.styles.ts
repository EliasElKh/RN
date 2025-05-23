import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';

export const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    backgroundColor: '#ffffff',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  imagePickerText: {
    color: '#ffffff',
    marginLeft: moderateScale(10),
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: moderateScale(10),
  },
  imagePreview: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(8),
    marginBottom: moderateScale(8),
  },
   rootContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
   backButton: {
    padding: moderateScale(10),
    position: 'absolute',
    top: moderateScale(10),
    left: moderateScale(10),
    zIndex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  scrollContent: {
    paddingTop: moderateScale(50),
  },
  loading:{
    position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
  },
});

export const darkStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: '#121212',
  },
  imagePickerText: {
    ...styles.imagePickerText,
    color: '#ffffff',
  },
  imagePicker: {
    ...styles.imagePicker,
    backgroundColor: '#c0392b',
  },
});
