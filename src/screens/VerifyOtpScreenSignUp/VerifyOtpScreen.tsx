import React from 'react';
import { View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRoute, useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

import { Input } from '../../components/atoms/Input';
import { Label } from '../../components/atoms/Label';
import { Button } from '../../components/atoms/Button';
import { styles } from './VerifyOtpScreen.styles';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

interface RouteParams {
  email: string;
}

const schema = z.object({
  otp: z.string()
    .min(4, 'OTP must be at least 4 digits')
    .max(6, 'OTP cannot be longer than 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

export default function VerifyOtpScreen() {
  const { theme } = useTheme();
  const style = styles(theme);
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { email } = route.params as RouteParams;
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { otp: string }) => {
  setIsVerifying(true);
  const maxRetries = 3;
  let attempts = 0;
  let success = false;
  let lastErrorMessage = 'Something went wrong';

  while (attempts < maxRetries && !success) {
    try {
      const response = await axios.post(
        'https://backend-practice.eurisko.me/api/auth/verify-otp',
        {
          email,
          otp: data.otp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Success', response.data.data.message);
        navigation.navigate('Login');
        success = true;
      } else {
        lastErrorMessage = response.data.message || lastErrorMessage;
        break;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        lastErrorMessage = error.response?.data?.message || lastErrorMessage;
      }
      attempts++;
      if (attempts < maxRetries) {
        await new Promise(res => setTimeout(res, 1000));
      }
    }
  }

  if (!success) {
    Alert.alert('Error', lastErrorMessage);
  }

  setIsVerifying(false);
};


const resendOtp = async () => {
  setIsResending(true);
  const maxRetries = 3;
  let attempts = 0;
  let success = false;
  let lastErrorMessage = 'Could not resend OTP';

  while (attempts < maxRetries && !success) {
    try {
      const response = await axios.post(
        'https://backend-practice.eurisko.me/api/auth/resend-verification-otp',
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        Alert.alert('Success', response.data.data.message);
        success = true;
      } else {
        lastErrorMessage = response.data.message || lastErrorMessage;
        break;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        lastErrorMessage = error.response?.data?.error?.message ||
          error.response?.data?.message ||
          lastErrorMessage;
      }

      attempts++;
      if (attempts < maxRetries) {
        await new Promise(res => setTimeout(res, 1000));
      }
    }
  }

  if (!success) {
    Alert.alert('Error', lastErrorMessage);
  }

  setIsResending(false);
};



  return (
    <View style={style.shadowContainer}>
      <View style={style.inputGroup}>
        <Label text="Enter OTP" />
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Enter OTP"
              style={[style.input, errors.otp && style.inputError]}
              keyboardType="numeric"
              maxLength={6}
            />
          )}
        />
        {errors.otp && <Label text={errors.otp.message} style={style.error} />}
      </View>

      <View style={style.buttonContainer}>
      <Button
        title={isVerifying ? 'Verifying...' : 'Verify OTP'}
        onPress={handleSubmit(onSubmit)}
        disabled={isVerifying}
        style={style.button}
      />
      <Button
        title={isResending ? 'Sending...' : 'Resend OTP'}
        onPress={resendOtp}
        variant="text"
        disabled={isResending}
        textStyle={style.textButtonText}
        testID="resend-otp-button"
      />
    </View>
    </View>
  );
}
