import React from 'react';
import { Navigator } from './src/Navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext/ThemeContext';
import { CartProvider } from './src/context/CartContext/CartContext';
// import PushNotification from 'react-native-push-notification';




export default function App() {


  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Navigator />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
