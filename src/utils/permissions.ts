import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import { PermissionsAndroid, Alert, Platform, Linking } from 'react-native';
import RNFS from 'react-native-fs';

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const permission =
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: 'Permission Required',
        message: 'We need access to your photos to continue.',
        buttonPositive: 'OK',
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Storage permission is disabled. Please enable it manually in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        Alert.alert('Permission Denied', 'Cannot continue without permission.');
      }

      return false;
    } catch (err) {
      Alert.alert('Permission Error', 'Failed to request permission');
      return false;
    }
  }
  return true;
};
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission Required',
          message: 'We need access to your camera to take photos.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Camera permission is disabled. Please enable it manually in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        Alert.alert('Permission Denied', 'Cannot use camera without permission.');
      }

      return false;
    } catch (err) {
      Alert.alert('Permission Error', 'Failed to request camera permission');
      return false;
    }
  }
  return true;
};

export const handleLongPress = async (uri: string) => {
  const granted = await requestStoragePermission();
  if (!granted) {
    Alert.alert('Permission Denied', 'Cannot save image without permission.');
    return;
  }
  try {
    const filename = uri.split('/').pop();
    const localPath = `${RNFS.CachesDirectoryPath}/${filename}`;
    const result = await RNFS.downloadFile({
      fromUrl: uri,
      toFile: localPath,
    }).promise;

    if (result.statusCode === 200) {
      await CameraRoll.save(localPath, { type: 'photo' });
      Alert.alert('Success', 'Image saved to gallery.');
    } else {
      throw new Error('Image download failed');
    }
  } catch (e) {
    Alert.alert('Error', 'Failed to save image.');
  }
};

