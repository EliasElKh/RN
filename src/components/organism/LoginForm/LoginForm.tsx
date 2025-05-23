import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LabeledInput } from '../../molecule/LabeledInput';
import { Button } from '../../atoms/Button';
import { styles as light} from './loginForm.styles';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { darkContainerStyles } from './loginForm.styles';
import { LoginFormProps } from './LoginForm.types';

const schema = z.object({
  username: z.string().email().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
});

type FormData = z.infer<typeof schema>;


export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onForgotPassword,error ,isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });
  const {theme } = useTheme();
        const styles = theme === 'dark' ? darkContainerStyles : light;
        const textColor = theme === 'dark' ? '#ffffff' : '#000000';

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Login Error',
        error,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false }
      );
    }
  }, [error]);

  const onSubmit = (data: FormData) => {
    onLoginSuccess(data.username, data.password);
  };
  const handleForgotPassword = () => {
    const email = getValues('username');
    onForgotPassword?.(email);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <>
            <LabeledInput
              label="Email"
              value={value}
              onChangeText={onChange}
              isError={!!errors.username}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <LabeledInput
              label="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              isError={!!errors.password}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        loading={isLoading}
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={{color:textColor}}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};


