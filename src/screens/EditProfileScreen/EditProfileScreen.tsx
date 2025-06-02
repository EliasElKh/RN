import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary ,launchCamera } from 'react-native-image-picker';
import { LabeledInput } from '../../components/molecule/LabeledInput';
import { Button } from '../../components/atoms/Button';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { styles as light, darkScreenStyles } from './editProfileScreen.styles';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { requestCameraPermission, requestStoragePermission } from '../../utils/permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';


export const EditProfileScreen = () => {
  const { theme } = useTheme();
  const styles = theme === 'dark' ? darkScreenStyles : light;

  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [imageLoading, setImageLoading] = useState(false);



    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async (token: string) => {
    try {
      const response = await axios.get('https://backend-practice.eurisko.me/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        return response.data.data.user;
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (fetchErr) {
      crashlytics().recordError(fetchErr as Error);
      throw fetchErr;
    }
  };
      const loadProfile = useCallback(async () => {
  if (!accessToken) {
    setError('No access token, please login');
    setLoading(false);
    return;
  }

  let retries = 5;
  let user = null;

  while (retries > 0) {
    try {
      user = await fetchProfile(accessToken);
      break;
    } catch (err) {
      retries--;
    }
  }

  if (user) {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    const fullImageUrl = user.profileImage?.url
      ? `https://backend-practice.eurisko.me${user.profileImage.url}`
      : null;
    setImageUri(fullImageUrl);
    setError(null);
  } else {
    crashlytics().recordError(new Error('Failed to fetch profile after multiple attempts'));
    setError('Failed to fetch profile after multiple attempts.');
  }

  setLoading(false);
}, [accessToken]);



useEffect(() => {
  loadProfile();
}, [accessToken, loadProfile]);

const handleImageSelection = (response: any) => {
    if (response.didCancel) {
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Unknown error');
    } else if (response.assets && response.assets.length > 0) {
      setImageUri(response.assets[0].uri ?? null);
    }
  };

 const handleChoosePhoto = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const hasCameraPermission = await requestCameraPermission();
            if (!hasCameraPermission) {
              Alert.alert('Permission denied', 'Cannot access camera.');
              return;
            }
            launchCamera(
              {
                mediaType: 'photo',
                quality: 1,
                saveToPhotos: true,
              },
              handleImageSelection
            );
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const hasPermission = await requestStoragePermission();
            if (!hasPermission) {
              Alert.alert('Permission denied', 'Cannot access your photo library.');
              return;
            }
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 1,
              },
              handleImageSelection
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSave = async () => {
  if (!accessToken) {
    Alert.alert('Error', 'You are not logged in.');
    return;
  }
  setIsSaving(true);
  try {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    if (imageUri && !imageUri.startsWith('http')) {
      const uriParts = imageUri.split('/');
      const fileName = uriParts[uriParts.length - 1];
      const fileType = fileName.split('.').pop() || 'jpg';

      formData.append('profileImage', {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    const response = await axios.put(
      'https://backend-practice.eurisko.me/api/user/profile',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.success) {
      Alert.alert('Success', 'Profile updated successfully');

    } else {
      Alert.alert('Error', 'Failed to update profile');

    }
  } catch (err: any) {
    Alert.alert('Error', 'An error occurred while updating your profile.');
  } finally {
    setIsSaving(false);
  }
};


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator testID="loading-spinner" size="large" color={theme === 'dark' ? 'white' : 'black'} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <MaterialIcons name="arrow-back" size={24} color={theme === 'dark' ? '#ffffff' : '#000000'} />
    </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={handleChoosePhoto} style={styles.imageContainer}>
  {imageUri ? (
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />
      {imageLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
    </View>
  ) : (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Tap to select image</Text>
    </View>
  )}
</TouchableOpacity>


      <LabeledInput label="First Name" value={firstName} onChangeText={setFirstName} isError={false} />
      <LabeledInput label="Last name" value={lastName} onChangeText={setLastName} isError={false} />

      <Button
  title={isSaving ? 'Saving...' : 'Save Changes'}
  onPress={handleSave}
  disabled={isSaving}
  loading={isSaving}
/>
    </SafeAreaView>
  );
};
