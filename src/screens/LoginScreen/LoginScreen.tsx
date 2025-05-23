import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles as lightStyles, darkScreenStyles, additionalStyles } from './loginScreen.styles';
import { LoginForm } from '../../components/organism/LoginForm';
import { useAuth } from '../../context/AuthContext';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../stack/stack';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

export const LoginScreen = () => {
  type Navigation = NativeStackNavigationProp<RootStackParamList, 'Login'>;
  const navigation = useNavigation<Navigation>();
  const { login } = useAuth();
  const { theme } = useTheme();
  const styles = theme === 'dark' ? darkScreenStyles : lightStyles;
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = async (email: string, password: string) => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unknown error occurred during login');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      Alert.alert('Please enter your email first.');
      return;
    }

    const maxRetries = 3;
    let attempt = 0;
    let success = false;
    setLoading(true);

    while (attempt < maxRetries && !success) {
      try {
        const response = await fetch('https://backend-practice.eurisko.me/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (data.success) {
          Alert.alert('Success', data.data.message);
          success = true;
        } else {
          Alert.alert('Error', data.message || 'Something went wrong.');
          break;
        }
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          Alert.alert('Error', 'Failed to send reset email after multiple attempts.');
        }
      }
    }

    setLoading(false);
  };

  return (
    <ScrollView
      style={additionalStyles.flexContainer}
      contentContainerStyle={additionalStyles.flexContainer}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>

        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onForgotPassword={handleForgotPassword}
          error={loginError}
          isLoading={isLoggingIn}
        />

        {loading && (
          <View style={additionalStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
