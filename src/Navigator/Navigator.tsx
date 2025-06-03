import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from '../stack/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { styles } from './Navigator.styles';
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      ProductDetail: 'product/:id',
    },
  },
};

export const Navigator = () => {
  return (
    <GestureHandlerRootView style={styles.GestureHandlerRootView}>
      <NavigationContainer  linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
