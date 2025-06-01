import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { ProductList } from '../../components/organism/ProductList/ProductList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles as light } from './HomeScreen.styles';
import { darkButtonStyles } from './HomeScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import axios from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';

export const HomeScreen: React.FC = () => {
  const { logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const styles = theme === 'dark' ? darkButtonStyles : light;
  const navigation = useNavigation<any>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [userId, setUserId] = useState<string | null>(null);
  const {accessToken} = useAuth(); // assuming you have accessToken in your AuthContext
  useEffect(() => {
  const fetchUserProfile = async () => {
    let attempts = 0;
    let success = false;

    while (attempts < 3 && !success) {
      try {
        const response = await axios.get('https://backend-practice.eurisko.me/api/user/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        setUserId(response.data.data.user.id);
        success = true;
      } catch (error) {
        attempts++;
      }
    }
  };

  fetchUserProfile();
}, [accessToken]);





  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity testID="logout-button" style={styles.button} onPress={logout}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          {/* <Text style={styles.text}>Sign Out</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <MaterialIcons name="brightness-6" size={20} color="#fff" />
          <Text style={styles.text}>Toggle Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => crashlytics().crash()}
        >
          <MaterialIcons name="crash" size={20} color="#fff" />
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>


      </View>

      <TextInput
        placeholder="Search products..."
        placeholderTextColor={theme === 'dark' ? '#ffffff' : '#000000'}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={styles.searchInput}
      />
      <Picker
        selectedValue={sortOrder}
        onValueChange={(value: string) => setSortOrder(value as 'asc' | 'desc')}
        style={styles.sortPicker}
      >
        <Picker.Item label="Price: Low to High" value="asc" />
        <Picker.Item label="Price: High to Low" value="desc" />
      </Picker>

      <ProductList
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        userId={userId ?? ''}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <MaterialIcons name="add" color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fabCart}
        onPress={() => navigation.navigate('Cart')}>
        <MaterialIcons name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>


    </View>
  );
};
