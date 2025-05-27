import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '../../context/CartContext/CartContext';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { styles, darkStyles } from './CartScreen.styles';

import { Button } from '../../components/atoms/Button/Button';
import { Label } from '../../components/atoms/Label/Label';

export const CartScreen = () => {
  const { cart, removeFromCart, increment, decrement, clearCart } = useCart();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const themedStyles = theme === 'dark' ? darkStyles : styles;

  return (
    <>
     <TouchableOpacity
             style={styles.backButton}
             onPress={() => navigation.goBack()}
           >
             <MaterialIcons name="arrow-back" size={24} color={theme === 'dark' ? '#ffffff' : '#000000'} />
           </TouchableOpacity>
      <View style={themedStyles.container}>
        <Label text="Shopping Cart" style={themedStyles.heading} />
        <FlatList
          data={cart}
          keyExtractor={item => item.product._id}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <Button
                  style={themedStyles.deleteButton}
                  onPress={() => removeFromCart(item.product._id)}
                  title="Delete"
                  textStyle={themedStyles.deleteText}
                />
              )}
            >
              <View style={themedStyles.cartItem}>
                <Label text={item.product.title} style={themedStyles.itemTitle} numberOfLines={1} />
                <Label text={`$${item.product.price}`} style={themedStyles.itemPrice} />
                <Button
                  style={themedStyles.qtyButton}
                  title="-"
                  onPress={() => decrement(item.product._id)}
                  textStyle={themedStyles.qtyText}
                />
                <Label text={String(item.quantity)} style={themedStyles.itemQuantity} />
                <Button
                  style={themedStyles.qtyButton}
                  title="+"
                  onPress={() => increment(item.product._id)}
                  textStyle={themedStyles.qtyText}
                />
              </View>
            </Swipeable>
          )}
          ListEmptyComponent={<Label text="Your cart is empty." style={themedStyles.emptyLabel} />}
        />
        <Button
          onPress={clearCart}
          style={themedStyles.clearButton}
          title="Clear Cart"
          textStyle={themedStyles.clearText}
        />
      </View>
    </>
  );
};