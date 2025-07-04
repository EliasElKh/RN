import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Animated, Share } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CardImage } from '../../components/atoms/CardImage/CardImage';
import { Label } from '../../components/atoms/Label';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { styles as light } from './ProductDetailScreen.styles';
import { darkScreenStyles } from './ProductDetailScreen.styles';
import { Product } from './ProductDetailScreen.types';
import { useAuth } from '../../context/AuthContext';
import Swiper from 'react-native-swiper';
import { handleLongPress } from '../../utils/permissions';
import { Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '../../utils/scalingUtils';
import crashlytics from '@react-native-firebase/crashlytics';
// import MapView, { Marker } from 'react-native-maps';
import { API_URL } from '@env';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { id: string } }, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
    const scale = useRef(new Animated.Value(1)).current;

    const handleImagePressIn = () => {
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const handleImagePressOut = () => {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const { theme } = useTheme();
  const styles = theme === 'dark' ? darkScreenStyles : light;
  type UserProfile = {
    firstName: string;
    lastName: string;
    createdAt: string;
    email: string;
    profileImage?: { url: string };
  };

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userLoading, setUserLoading] = useState(true);


  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

const fetchUserProfile = React.useCallback(async (userId: string) => {
  let retries = 0;
  const maxRetries = 5;

  while (retries < maxRetries) {
    try {
      const res = await fetch(`${API_URL}/api/user/profile/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        crashlytics().recordError(new Error(`HTTP error! status: ${res.status}`));
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setUserProfile(data.data.user);
        break;
      } else {
        throw new Error('Unsuccessful response');
      }
    } catch (err) {
      retries++;
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
    } finally {
      if (retries === maxRetries || userProfile) {
        setUserLoading(false);
      }
    }
  }
}, [accessToken, userProfile]);

const handleShare = async () => {
  try {
    const url = `myapp://product/${product?.data?._id}`;
    const title = product?.data?.title || 'Product';
    await Share.share({
      message: `Check out this product: ${title}\n\n<${url}>`,
    });
  } catch (error) {
    Alert.alert('Error', 'Failed to share product.');
  }
};


  useEffect(() => {
    const fetchProductWithRetries = async () => {
      let retries = 0;
      const maxRetries = 5;

      while (retries < maxRetries) {
        try {
          const res = await fetch(`${API_URL}/api/products/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setProduct(data);
          fetchUserProfile(data.data.user._id);
          setLoading(false);


          return;
        } catch (error) {
          retries++;
          if (retries === maxRetries) {
            Alert.alert('Error', 'Failed to load product after several attempts.');
            setLoading(false);
            return;
          }
        }
      }
    };

    fetchProductWithRetries();
  }, [accessToken, fetchUserProfile, id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }


  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
  <TouchableOpacity  testID="back-button" style={styles.goBack} onPress={() => navigation.goBack()}>
    <MaterialIcons
      name="arrow-back"
      size={moderateScale(24)}
      color={theme === 'dark' ? '#ffffff' : '#000000'}
    />
  </TouchableOpacity>

  {/* <Swiper style={styles.swiper} showsPagination loop>
    {product.data.images.map((img: { url: string }, idx: number) => {
      const imageUrl = `https://backend-practice.eurisko.me${img.url}`;
      return (
        <TouchableOpacity
          key={idx}
          onLongPress={() => handleLongPress(imageUrl)}
        >
          <CardImage uri={imageUrl} />
        </TouchableOpacity>
      );
    })}
  </Swiper> */}
  <Swiper style={ styles.swiper } showsPagination loop>
    {product.data.images.map((img: { url: string }, idx: number) => {
      const imageUrl = `${API_URL}${img.url}`;
      return (
        <TouchableOpacity
          key={idx}
          onLongPress={() => handleLongPress(imageUrl)}
          onPressIn={handleImagePressIn}
          onPressOut={handleImagePressOut}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <CardImage uri={imageUrl} />
          </Animated.View>
        </TouchableOpacity>
      );
    })}
  </Swiper>

  <Label text={product.data.title} style={styles.title} />
  <Label text={`$${product.data.price}`} style={styles.price} />
  <Label text={product.data.description} style={styles.description} />
  <TouchableOpacity testID="share-button" onPress={handleShare} style={styles.shareButton}>
  <MaterialIcons name="share" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
  </TouchableOpacity>
  {'i dont have a API Key FOr google maps'}
  {/* <MapView
    style={styles.map}
    initialRegion={{
      latitude: product.data.location.latitude,
      longitude: product.data.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker
      coordinate={{
        latitude: product.data.location.latitude,
        longitude: product.data.location.longitude,
      }}
      title={product.data.location.name}
    />
  </MapView> */}

  <TouchableOpacity
    onPress={() =>
      Linking.openURL(`mailto:${product.data.user.email}`)
    }
  >
    <Text style={styles.contactText}>
      Contact Owner: {product.data.user.email}
    </Text>
  </TouchableOpacity>

  {userLoading ? (
    <ActivityIndicator style={styles.loadingIndicator} size="small" />
  ) : (
    userProfile && (
      <View style={styles.ownerContainer}>
        <Text style={styles.ownerName}>
          {userProfile.firstName} {userProfile.lastName}
        </Text>
        <Text style={styles.ownerJoined}>
          Joined: {new Date(userProfile.createdAt).toDateString()}
        </Text>
        {userProfile.profileImage?.url && (
          <CardImage
            uri={`${API_URL}${userProfile.profileImage.url}`}
            style={styles.cardImage}
          />
        )}
      </View>
    )
  )}
</ScrollView>

  );
};
