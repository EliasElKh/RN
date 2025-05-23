import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button } from '../../atoms/Button';
import { styles as light} from './verificationForm.styles';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { darkInputBoxStyles } from './verificationForm.styles';

interface Props {
  onVerificationSuccess: () => void;
}

export const VerificationForm: React.FC<Props> = ({ onVerificationSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(false);

  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const {theme } = useTheme();
                const styles = theme === 'dark' ? darkInputBoxStyles : light;

  const handleChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;

    setOtp(updatedOtp);

    if (text && index < 3) {
      refs[index + 1].current?.focus();
    }

    setError(false);
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      setError(true);
      return;
    }

    if (fullOtp === '1234') {
      onVerificationSuccess();
    } else {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={refs[index]}
            value={digit}
            onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), index)}
            maxLength={1}
            keyboardType="numeric"
            style={[styles.inputBox, error && styles.inputBoxError]}
          />
        ))}
      </View>
      {error && <Text style={styles.error}>Please enter a valid 4-digit OTP</Text>}
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};
