
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SignUpForm } from '../../components/molecule/SignUpForm/SignUpForm';
import { styles as light} from './signUpScreen.styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../stack/Stack';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import {darkScreenStyles} from './signUpScreen.styles';
export const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {theme } = useTheme();
    const styles = theme === 'dark' ? darkScreenStyles : light;
  return (
     <ScrollView
    style={styles.scrollview}
    contentContainerStyle={styles.contentContaienr}
    keyboardShouldPersistTaps="handled"
  >
    <View style={styles.screen}>
      <Text style={styles.header}>Create Account</Text>

      <View style={styles.container}>
        <SignUpForm />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};


