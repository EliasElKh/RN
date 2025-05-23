import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibrary } from 'react-native-image-picker';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { styles as light, darkShadowInputStyles } from './signUpForm.styles';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { requestStoragePermission } from '../../../utils/permissions';


const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

type ImageType = {
  uri: string;
  fileName?: string;
  type?: string;
};

export const SignUpForm = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const styles = theme === 'dark' ? darkShadowInputStyles : light;
  const [image, setImage] = useState<ImageType | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const pickImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access photos without permission.');
      return;
    }
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
      if (result.assets?.length) {
        const asset = result.assets[0];
        if (asset.uri) {
          setImage({
            uri: asset.uri,
            fileName: asset.fileName,
            type: asset.type,
          });
        } else {
          Alert.alert('Error', 'Selected image has no URI');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const onSubmit = async (data: FormData) => {
  const formData = new FormData();

  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('email', data.email);
  formData.append('password', data.password);

  if (image && image.uri) {
    formData.append('profileImage', {
      uri: image.uri,
      name: image.fileName || 'profile.jpg',
      type: image.type || 'image/jpeg',
    });
  }else{
    formData.append('profileImage', '');
  }

  try {
    setLoading(true);
    const res = await axios.post(
      'https://backend-practice.eurisko.me/api/auth/signup',
      formData,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (requestData) => requestData,
      }
    );

    if (res.data.success) {
      Alert.alert('Success', res.data.data.message);
      navigation.navigate('VerifyOtp', { email: data.email});
    }
  } catch (error: any) {
    let errorMessage = 'Signup failed';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message ||
                   error.message ||
                   'Signup failed';
    }
    Alert.alert('Error', errorMessage);
  } finally {
    setLoading(false);
  }
};




  return (
    <View style={styles.shadowContainer}>
      {/* First Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="John"
              value={value}
              onChangeText={onChange}
              isError={!!errors.firstName}
              style={[styles.input, errors.firstName && styles.inputError]}
            />
          )}
        />
        {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
      </View>

      {/* Last Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Doe"
              value={value}
              onChangeText={onChange}
              isError={!!errors.lastName}
              style={[styles.input, errors.lastName && styles.inputError]}
            />
          )}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
      </View>

      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="email@example.com"
              value={value}
              onChangeText={onChange}
              isError={!!errors.email}
              style={[styles.input, errors.email && styles.inputError]}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>

      {/* Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="••••••••"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              isError={!!errors.password}
              style={[styles.input, errors.password && styles.inputError]}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>

      {/* Profile Image Upload */}
      <View style={styles.inputGroup}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={theme === 'dark' ? darkShadowInputStyles.switchLink : light.switchLink}>
            {image ? 'Change Profile Image' : 'Pick Profile Image (Optional)'}
          </Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        )}
      </View>

      {/* Submit Button */}
      <Button title={loading ? 'Signing Up...' : 'Sign Up'} onPress={handleSubmit(onSubmit)} disabled={loading} />
    </View>
  );
};
