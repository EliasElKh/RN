import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartScreen } from './CartScreen';


jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    TouchableOpacity: View,
  };
});


const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));


jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));


const mockProduct = {
  _id: '1',
  title: 'Test Product',
  price: 99,
};


let mockRemoveFromCart = jest.fn();
let mockIncrement = jest.fn();
let mockDecrement = jest.fn();
let mockClearCart = jest.fn();

jest.mock('../../context/CartContext/CartContext', () => ({
  useCart: () => ({
    cart: [
      { product: mockProduct, quantity: 2 },
    ],
    removeFromCart: mockRemoveFromCart,
    increment: mockIncrement,
    decrement: mockDecrement,
    clearCart: mockClearCart,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockRemoveFromCart = jest.fn();
  mockIncrement = jest.fn();
  mockDecrement = jest.fn();
  mockClearCart = jest.fn();
  mockGoBack.mockClear();
});

it('renders product in cart', () => {
  const { getByText } = render(<CartScreen />);
  expect(getByText('Test Product')).toBeTruthy();
  expect(getByText('$99')).toBeTruthy();
  expect(getByText('2')).toBeTruthy();
});

it('calls goBack on back button press', () => {
  render(<CartScreen />);




});

it('calls increment and decrement', () => {
  const { getByText } = render(<CartScreen />);
  fireEvent.press(getByText('+'));
  expect(mockIncrement).toHaveBeenCalledWith('1');
  fireEvent.press(getByText('-'));
  expect(mockDecrement).toHaveBeenCalledWith('1');
});

it('calls removeFromCart on Delete press', () => {

});

it('calls clearCart on Clear Cart press', () => {
  const { getByText } = render(<CartScreen />);
  fireEvent.press(getByText('Clear Cart'));
  expect(mockClearCart).toHaveBeenCalled();
});

it('shows empty message when cart is empty', () => {

  jest.spyOn(require('../../context/CartContext/CartContext'), 'useCart').mockReturnValueOnce({
    cart: [],
    removeFromCart: mockRemoveFromCart,
    increment: mockIncrement,
    decrement: mockDecrement,
    clearCart: mockClearCart,
  });

  const { getByText } = render(<CartScreen />);
  expect(getByText('Your cart is empty.')).toBeTruthy();
});
