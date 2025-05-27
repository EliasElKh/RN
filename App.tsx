import React, { useEffect } from 'react';
import { Navigator } from './src/Navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext/ThemeContext';
import { CartProvider } from './src/context/CartContext/CartContext';
// import PushNotification from 'react-native-push-notification';
import { Linking } from 'react-native';

export default function App() {
  // useEffect(() => {
  //   PushNotification.configure({
  //     onNotification: function (notification: { data: string; userInfo: any; }) {
  //       const url: string | undefined =
  //         (notification.data && (notification as any).data.link) ||
  //         (notification.userInfo && notification.userInfo.productId && `myapp://product/${notification.userInfo.productId}`);
  //       if (typeof url === 'string') {
  //         Linking.openURL(url);
  //       }
  //     },
  //     // requestPermissions: true, // (if you want, for iOS)
  //   });
  // }, []);

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
