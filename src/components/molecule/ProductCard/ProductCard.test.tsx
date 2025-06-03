jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({ accessToken: 'fake-token' }),
}));

jest.mock('../../../context/CartContext/CartContext', () => ({
  useCart: () => ({
    cart: [],
    addToCart: jest.fn(),
  }),
}));

jest.mock('../../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('react-native-swiper', () => {
  return ({ children }: any) => children;
});

jest.mock('../../../utils/permissions', () => ({
  handleLongPress: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));




import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from './ProductCard';

const mockItem = {
  _id: '123',
  title: 'Test Product',
  description: 'This is a test description that is long enough to get trimmed.',
  price: 99.99,
  user: { _id: 'user1' },
  images: [{ _id: 'img1', url: '/image1.jpg' }],
};

describe('ProductCard', () => {
  it('renders product title and price', () => {
    const { getByText } = render(
      <ProductCard item={mockItem} userId="not-owner" />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
    expect(getByText('Add to Cart')).toBeTruthy();
  });

  it('calls addToCart when "Add to Cart" button is pressed', () => {
        jest.mock('../../../context/CartContext/CartContext', () => {
    const mockAddToCart = jest.fn();

    return {
        useCart: () => ({
        cart: [],
        addToCart: mockAddToCart,
        }),
    };
    });

    const { getByText } = render(
      <ProductCard item={mockItem} userId="not-owner" />
    );

    fireEvent.press(getByText('Add to Cart'));

  });
});
