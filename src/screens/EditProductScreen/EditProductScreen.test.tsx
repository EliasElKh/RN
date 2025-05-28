import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { EditProductScreen } from './EditProductScreen';

// Mocks
jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ accessToken: 'mock-token' }),
}));
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
  useRoute: () => ({
    params: {
      product: {
        _id: '1',
        title: 'Old Title',
        description: 'Old Description',
        price: 99,
        location: { name: 'Old Place', longitude: 33.2, latitude: 35.5 },
        images: [{ url: '/img1.jpg' }],
      },
    },
  }),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
jest.mock('../../utils/permissions', () => ({
  requestStoragePermission: jest.fn(() => Promise.resolve(true)),
}));

// Silence ActivityIndicator warnings
jest.mock('react-native/Libraries/Components/ActivityIndicator/ActivityIndicator', () => 'ActivityIndicator');

describe('EditProductScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all inputs with default values', () => {
    const { getByPlaceholderText } = render(<EditProductScreen />);
    expect(getByPlaceholderText('Enter title').props.value).toBe('Old Title');
    expect(getByPlaceholderText('Enter description').props.value).toBe('Old Description');
    expect(getByPlaceholderText('Enter price').props.value).toBe('99');
    expect(getByPlaceholderText('e.g. Cairo').props.value).toBe('Old Place');
    expect(getByPlaceholderText('e.g. 31.2357').props.value).toBe('33.2');
    expect(getByPlaceholderText('e.g. 30.0444').props.value).toBe('35.5');
  });

  it('shows validation error if any field or image is empty', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<EditProductScreen />);
    // Clear a field to trigger validation
    fireEvent.changeText(getByPlaceholderText('Enter title'), '');
    // Remove all images
    fireEvent.press(getByText('Select up to 5 images'));
    await act(async () => {
      fireEvent.press(getByText('Save Changes'));
    });
    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Validation Error',
        'All fields and at least one image are required.'
      )
    );
  });

  it('calls image picker on press', async () => {
    const { getByText } = render(<EditProductScreen />);
    const { launchImageLibrary } = require('react-native-image-picker');
    launchImageLibrary.mockImplementation((_opts: any, cb: (arg0: { assets: { uri: string; }[]; }) => any) => cb({ assets: [{ uri: 'mock://uri.jpg' }] }));
    await act(async () => {
      fireEvent.press(getByText('Select up to 5 images'));
    });
    expect(launchImageLibrary).toHaveBeenCalled();
  });

  it('submits product and shows success alert', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText, getByPlaceholderText } = render(<EditProductScreen />);
    // Change a field for realism
    fireEvent.changeText(getByPlaceholderText('Enter title'), 'Updated Title');
    // Pick image to ensure images.length > 0
    const { launchImageLibrary } = require('react-native-image-picker');
    launchImageLibrary.mockImplementation((_opts: any, cb: (arg0: { assets: { uri: string; fileName: string; type: string; }[]; }) => any) =>
      cb({ assets: [{ uri: 'mock://uri.jpg', fileName: 'f.jpg', type: 'image/jpeg' }] })
    );
    fireEvent.press(getByText('Select up to 5 images'));
    await act(async () => {
      fireEvent.press(getByText('Save Changes'));
    });

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Success',
        'Product updated successfully.'
      )
    );
  });
});
