import React, { useState } from 'react';
import { CardImage } from '../../atoms/CardImage/CardImage';
import { Label } from '../../atoms/Label';
import { styles as light} from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import {darkCardStyles} from './ProductCard.styles';
import { useAuth } from '../../../context/AuthContext';
import Swiper from 'react-native-swiper';
import { handleLongPress } from '../../../utils/permissions';

export const ProductCard: React.FC<ProductCardProps> = ({ item,userId,onDeleteSuccess }) => {
    const navigation = useNavigation<any>();
    const isOwner = item.user._id === userId;
    const [isDeleting, setIsDeleting] = useState(false);
    const { accessToken } = useAuth();
    const {theme } = useTheme();
                const styles = theme === 'dark' ? darkCardStyles : light;
    const handlePress = () => {
      navigation.navigate('ProductDetail', { id: item._id });
    };
    const teaser = item.description.length > 60
  ? item.description.slice(0, 60) + '...'
  : item.description;

     const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: async () => {
            if (isDeleting) {return;}
            setIsDeleting(true);
            try {
              const response = await fetch(`https://backend-practice.eurisko.me/api/products/${item._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete product');
              }

              Alert.alert('Success', 'Product deleted successfully');
              onDeleteSuccess?.(item._id);
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Something went wrong');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };


     return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Swiper style={ styles.swiper } showsPagination loop>
              {item.images.map((img: { url: string }, idx: number) => {
                const imageUrl = `https://backend-practice.eurisko.me${img.url}`;
                return (
                  <TouchableOpacity key={idx} onLongPress={() => handleLongPress(imageUrl)}>
                    <CardImage uri={imageUrl} />
                  </TouchableOpacity>
                );
              })}
            </Swiper>
      <Label text={item.title} style={styles.title} />
      <Label text={teaser} style={styles.description} />
      <Label text={`$${item.price}`} style={styles.price} />

      {isOwner && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProductScreen', { product: item })}
          >
            <Label text="Edit" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Label text="Delete" />
            )}
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
  };
