import React, {useState } from 'react';
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
import { styles as light } from '../AddProductScreen/AddProductScreen.styles';
import { Input } from '../../components/atoms/Input/Input';
import { Label } from '../../components/atoms/Label/Label';
import { Button } from '../../components/atoms/Button/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../../context/AuthContext';
import { requestStoragePermission } from '../../utils/permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { moderateScale } from '../../utils/scalingUtils';
import { darkStyles } from '../AddProductScreen/AddProductScreen.styles';


export const EditProductScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = theme === 'dark' ? darkStyles : light;
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as any;

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [locationName, setLocationName] = useState(product.location.name);
  const [longitude, setLongitude] = useState(product.location.longitude.toString());
  const [latitude, setLatitude] = useState(product.location.latitude.toString());
  const [images, setImages] = useState<any[]>(product.images.map((img: any) => ({ uri: `https://backend-practice.eurisko.me${img.url}` })));
  const [loading, setLoading] = useState(false);

  const pickImages = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {return;}

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, res => {
      if (!res.didCancel && res.assets) {
        setImages(res.assets);
      }
    });
  };

const handleSubmit = async () => {
  if (!title || !description || !price || !locationName || !longitude || !latitude || images.length === 0) {
    return Alert.alert('Validation Error', 'All fields and at least one image are required.');
  }

  setLoading(true);

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);
  formData.append(
    'location',
    JSON.stringify({
      name: locationName,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    })
  );

  images.forEach((img, index) => {
    formData.append('images', {
      uri: img.uri,
      name: img.fileName || `photo_${index}.jpg`,
      type: img.type || 'image/jpeg',
    });
  });

  let attempts = 0;
  const maxRetries = 5;
  let success = false;

  while (attempts < maxRetries && !success) {
    try {
      const res = await fetch(`https://backend-practice.eurisko.me/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (res.ok) {
        Alert.alert('Success', 'Product updated successfully.');
        navigation.goBack();
        success = true;
        break;
      } else {
        attempts++;
        if (attempts === maxRetries) {
          Alert.alert('Error', 'Failed to update product after multiple attempts.');
        }
      }
    } catch (err) {
      attempts++;
      if (attempts === maxRetries) {
        Alert.alert('Error', 'An unexpected error occurred after multiple attempts.');
      }
    }
  }

  setLoading(false);
};


  return (
    <View style={[styles.scrollView, styles.container]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={theme === 'dark' ? '#ffffff' : '#000000'} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.container, { paddingTop: moderateScale(50) }]}
        keyboardShouldPersistTaps="handled"
      >
        <Label text="Title" />
        <Input value={title} onChangeText={setTitle} placeholder="Enter title" />

        <Label text="Description" />
        <Input value={description} onChangeText={setDescription} placeholder="Enter description" multiline />

        <Label text="Price" />
        <Input value={price} onChangeText={setPrice} placeholder="Enter price" keyboardType="numeric" />

        <Label text="Location Name" />
        <Input value={locationName} onChangeText={setLocationName} placeholder="e.g. Cairo" />

        <Label text="Longitude" />
        <Input value={longitude} onChangeText={setLongitude} placeholder="e.g. 31.2357" keyboardType="numeric" />

        <Label text="Latitude" />
        <Input value={latitude} onChangeText={setLatitude} placeholder="e.g. 30.0444" keyboardType="numeric" />

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

        <Button title="Save Changes" onPress={handleSubmit} />
      </ScrollView>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};
