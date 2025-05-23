import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { scaleFont } from '../../utils/fontScaling';

export const styles = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';

  const colors = {
    primary: '#4361EE',
    background: isDark ? '#121212' : '#F8F9FA',
    cardBg: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#F5F5F5' : '#212529',
    border: isDark ? '#333333' : '#E9ECEF',
    error: '#FF4D4F',
    placeholder: isDark ? '#AAAAAA' : '#6C757D',
    buttonText: '#FFFFFF',
    secondaryButton: isDark ? '#2A2A2A' : '#E9ECEF',
  };

  return StyleSheet.create({
    shadowContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScale(32),
      backgroundColor: colors.background,
    },
    inputGroup: {
      marginBottom: moderateScale(24),
    },
    label: {
      fontSize: scaleFont(14),
      fontFamily: 'ComicRelief-Regular',
      fontWeight: '500',
      marginBottom: moderateScale(8),
      color: colors.text,
    },
    input: {
      borderWidth: moderateScale(1),
      borderColor: colors.border,
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(14),
      borderRadius: moderateScale(8),
      backgroundColor: colors.cardBg,
      color: colors.text,
      fontSize: scaleFont(16),
      fontFamily: 'ComicRelief-Regular',
      shadowColor: isDark ? '#000' : 'rgba(0,0,0,0.05)',
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    inputError: {
      borderColor: colors.error,
      backgroundColor: isDark ? '#2A1A1A' : '#FFF0F0',
    },
    error: {
      color: colors.error,
      fontSize: scaleFont(13),
      marginTop: moderateScale(6),
      marginLeft: moderateScale(4),
      fontFamily: 'ComicRelief-Regular',
    },
    buttonContainer: {
      gap: moderateScale(12),
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: moderateScale(8),
      paddingVertical: moderateScale(14),
    },
    textButton: {
      marginTop: 0,
    },
    textButtonText: {
      color: colors.primary,
      fontWeight: '500',
      textAlign: 'center',
      fontSize: scaleFont(14),
      fontFamily: 'ComicRelief-Regular',
    },
  });
};
