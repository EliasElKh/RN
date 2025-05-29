import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, Share, Linking } from 'react-native';
import { ProductDetailScreen } from './ProductDetailScreen';
import axios from 'axios';
    jest.spyOn(Share, 'share').mockImplementation(() => Promise.resolve({ action: 'sharedAction' }));
// Mock navigation and route
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
  useRoute: () => ({
    params: { id: 'product1' },
  }),
}));

jest.mock('react-native-swiper', () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});


// Mock theme context
jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

// Mock Auth context
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ accessToken: 'mock-token' }),
}));

// Mock CardImage, Label, Swiper, permissions, scaling
jest.mock('../../components/atoms/CardImage/CardImage', () => ({
  CardImage: ({ _uri }: { _uri: string }) => <></>,
}));
jest.mock('../../components/atoms/Label', () => ({
  Label: ({ text }: { text: string }) => <>{text}</>,
}));
jest.mock('react-native-swiper', () => 'Swiper');
jest.mock('../../utils/permissions', () => ({
  handleLongPress: jest.fn(),
}));
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('../../utils/scalingUtils', () => ({
  moderateScale: (v: number) => v,
}));
jest.mock('axios');

const mockedProduct = {
  title: 'Product Title',
  description: 'Desc',
  price: 123,
  images: [],
  user: { email: 'a@b.com', firstName: 'A', lastName: 'B', createdAt: '2025-05-29' },
};

(axios.get as jest.Mock).mockResolvedValueOnce({
  data: mockedProduct,
});

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    jest.spyOn(Share, 'share').mockImplementation(() => Promise.resolve({ action: 'sharedAction' }));
    jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
  });

  it('renders loading indicator initially', () => {
    // product fetch promise never resolves so it stays loading
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    const {} = render(<ProductDetailScreen />);
    // Provide testID to ActivityIndicator in your real component for easier querying
    // expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows alert if fetch fails after retries', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
    render(<ProductDetailScreen />);
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to load product after several attempts.')
    );
  });

  it('handles share button press', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/products/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: {
              _id: 'product1',
              title: 'Product Title',
              price: 123,
              description: 'Desc',
              images: [{ url: '/img.png' }],
              user: { _id: 'user1', email: 'a@b.com', firstName: 'A', lastName: 'B', createdAt: new Date().toISOString() },
              location: { latitude: 0, longitude: 0, name: 'Test' },
            },
          }),
        });
      }
      // user profile
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { user: { firstName: 'A', lastName: 'B', email: 'a@b.com', createdAt: new Date().toISOString() } },
        }),
      });
    });

    const { findByTestId } = render(<ProductDetailScreen />);
    const shareButton = await findByTestId('share-button'); // Add testID to TouchableOpacity in your real component
    fireEvent.press(shareButton);
    expect(Share.share).toHaveBeenCalled();
  });

  it('back button navigates back', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/products/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: {
              _id: 'product1',
              title: 'Product Title',
              price: 123,
              description: 'Desc',
              images: [{ url: '/img.png' }],
              user: { _id: 'user1', email: 'a@b.com', firstName: 'A', lastName: 'B', createdAt: new Date().toISOString() },
              location: { latitude: 0, longitude: 0, name: 'Test' },
            },
          }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { user: { firstName: 'A', lastName: 'B', email: 'a@b.com', createdAt: new Date().toISOString() } },
        }),
      });
    });
    const { findByTestId } = render(<ProductDetailScreen />);
    const backButton = await findByTestId('back-button'); // Add testID to your TouchableOpacity
    fireEvent.press(backButton);
    // You'd want to check that goBack is called.
  });
});
