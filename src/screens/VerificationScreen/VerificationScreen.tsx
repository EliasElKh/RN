import React from 'react';
import { View, Text, Alert } from 'react-native';
import { VerificationForm } from '../../components/molecule/VerificationForm/VerificationForm';
import { useAuth } from '../../context/AuthContext';
import { styles as light } from './VerificationScreen.styles';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { darkScreenStyles } from './VerificationScreen.styles';






export const VerificationScreen = () => {

  const { verifyOTP } = useAuth();
  const {theme } = useTheme();
      const styles = theme === 'dark' ? darkScreenStyles : light;

  const handleVerificationSuccess = () => {
    Alert.alert('OTP Verified', 'You have successfully verified your OTP!');
    verifyOTP();

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter OTP</Text>
      <VerificationForm  onVerificationSuccess={handleVerificationSuccess} />
    </View>
  );
};
