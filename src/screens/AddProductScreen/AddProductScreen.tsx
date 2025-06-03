import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { styles as light, darkStyles } from './AddProductScreen.styles';
import { Input } from '../../components/atoms/Input/Input';
import { Label } from '../../components/atoms/Label/Label';
import { Button } from '../../components/atoms/Button/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../../context/AuthContext';
import { requestStoragePermission } from '../../utils/permissions';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../utils/scalingUtils';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PushNotification from 'react-native-push-notification';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import {API_URL} from '@env';


const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  locationName: z.string().min(1, 'Location name is required'),
  longitude: z.string().min(1, 'Longitude is required'),
  latitude: z.string().min(1, 'Latitude is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export const AddProductScreen: React.FC = () => {


useEffect(() => {
  // Request permission on Android 13+
  async function askPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  }

  askPermission();

  PushNotification.createChannel(
    {
      channelId: 'CreateProduct-channel',
      channelName: 'Product Creation Channel',
      importance: 4,
    },
    (created: any) => console.log(`createChannel returned '${created}'`)
  );

}, []);
  const { theme } = useTheme();
  const styles = theme === 'dark' ? darkStyles : light;
  const { accessToken } = useAuth();
  const navigation = useNavigation();

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const pickImages = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {return;}

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, res => {
      if (!res.didCancel && res.assets) {
        setImages(res.assets);
      }
    });
  };

  const onSubmit = async (data: ProductFormData) => {

    if (images.length === 0) {
      return Alert.alert('Validation Error', 'At least one image is required.');
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append(
      'location',
      JSON.stringify({
        name: data.locationName,
        longitude: parseFloat(data.longitude),
        latitude: parseFloat(data.latitude),
      })
    );

    images.forEach((img, index) => {
      formData.append('images', {
        uri: img.uri,
        name: img.fileName || `photo_${index}.jpg`,
        type: img.type || 'image/jpeg',
      });
    });

    const MAX_RETRIES = 5;
    let attempt = 0;
    let success = false;

    while (attempt < MAX_RETRIES && !success) {
      try {
        const res = await fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (res.ok) {
          success = true;
          Alert.alert('Success', 'Product created successfully.');
          navigation.goBack();
           PushNotification.localNotification({
            channelId: 'CreateProduct-channel',
            title: 'Product Created',
            message: 'Your product has been created successfully.',
          });
        } else {
          attempt++;
          if (attempt >= MAX_RETRIES) {
            Alert.alert('Error', 'Failed to create product after multiple attempts.');
          }
        }
      } catch (err) {
        attempt++;
        if (attempt >= MAX_RETRIES) {
          crashlytics().recordError(err as Error);
          Alert.alert('Error', 'An unexpected error occurred after multiple attempts.');
        }
      }
    }

    setLoading(false);
  };

  return (
    <View style={[styles.scrollView, styles.container]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color={theme === 'dark' ? '#ffffff' : '#000000'} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.container, { paddingTop: moderateScale(50) }]}
        keyboardShouldPersistTaps="handled"
      >
        <Label text="Title" />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Enter title" error={errors.title?.message} />
          )}
        />

        <Label text="Description" />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Enter description"
              multiline
              error={errors.description?.message}
            />
          )}
        />

        <Label text="Price" />
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Enter price"
              keyboardType="numeric"
              error={errors.price?.message}
            />
          )}
        />

        <Label text="Location Name" />
        <Controller
          control={control}
          name="locationName"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="e.g. Cairo" error={errors.locationName?.message} />
          )}
        />

        {/* NOTE: Location input is done manually since i dont have API key */}
        <Label text="Longitude" />
        <Controller
          control={control}
          name="longitude"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="e.g. 31.2357"
              keyboardType="numeric"
              error={errors.longitude?.message}
            />
          )}
        />

        <Label text="Latitude" />
        <Controller
          control={control}
          name="latitude"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="e.g. 30.0444"
              keyboardType="numeric"
              error={errors.latitude?.message}
            />
          )}
        />

        <Label text="Images" />
        <TouchableOpacity style={styles.imagePicker} onPress={pickImages}>
          <MaterialIcons name="photo-library" size={24} color="#fff" />
          <Text style={styles.imagePickerText}>Select up to 5 images</Text>
        </TouchableOpacity>

        <View style={styles.imagePreviewContainer}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img.uri }} style={styles.imagePreview} />
          ))}
        </View>

        <Button title="Create Product" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};


