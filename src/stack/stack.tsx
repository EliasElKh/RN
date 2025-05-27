import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { VerificationScreen } from '../screens/VerificationScreen/VerificationScreen';
import { useAuth } from '../context/AuthContext';
import { SignUpScreen } from '../screens/SignUpScreen/SignUpScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreenSignUp/VerifyOtpScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen/EditProfileScreen';
import { AddProductScreen } from '../screens/AddProductScreen/AddProductScreen';
import { EditProductScreen } from '../screens/EditProductScreen/EditProductScreen';
import { CartScreen } from '../screens/CartScreen/CartScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Verification: undefined;
  SignUp: undefined;
  ProductDetail: { id: string };
  VerifyOtp: undefined;
  EditProfile: undefined;
  AddProduct: undefined;
  EditProductScreen: { product: any };
  Cart: undefined;
};

const StackNav = createNativeStackNavigator<RootStackParamList>();

export const Stack = () => {
  const { isLoggedIn, isVerified } = useAuth();

  return (
    <StackNav.Navigator screenOptions={{ headerShown: false }}>
      {!isVerified ? (
        <StackNav.Screen name="Verification" component={VerificationScreen} />
      ) : isLoggedIn ? (
        <>
        <StackNav.Screen name="Home" component={HomeScreen} />
        <StackNav.Screen name="ProductDetail" component={ProductDetailScreen} />
        <StackNav.Screen name="EditProfile" component={EditProfileScreen} />
        <StackNav.Screen name="AddProduct" component={AddProductScreen}/>
        <StackNav.Screen name="EditProductScreen" component={EditProductScreen} />
        <StackNav.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <>
          <StackNav.Screen name="Login" component={LoginScreen} />
          <StackNav.Screen name="SignUp" component={SignUpScreen} />
          <StackNav.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        </>
      )}
    </StackNav.Navigator>
  );
};
