// src/screens/EditProfileScreen/EditProfileScreen.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { EditProfileScreen } from './EditProfileScreen';

// Mocks
jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ accessToken: 'mock-token' }),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));

jest.mock('axios');
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));
jest.mock('../../utils/permissions', () => ({
  requestCameraPermission: jest.fn(() => Promise.resolve(true)),
  requestStoragePermission: jest.fn(() => Promise.resolve(true)),
}));

// Minimal mock for LabeledInput and Button (no out-of-scope var)
jest.mock('../../components/molecule/LabeledInput', () => ({
  LabeledInput: () => null,
}));
jest.mock('../../components/atoms/Button', () => ({
  Button: () => null,
}));

import axios from 'axios';

describe('EditProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner initially', () => {
    (axios.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
    const { getByTestId } = render(<EditProfileScreen />);
    // Add testID to ActivityIndicator in your component for this to work!
    // <ActivityIndicator testID="loading-spinner" ... />
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('shows error message if fetch fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
    const { getByText } = render(<EditProfileScreen />);
    await waitFor(() =>
      expect(getByText('Failed to fetch profile after multiple attempts.')).toBeTruthy()
    );
  });

  it('renders profile fields after successful fetch', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        success: true,
        data: { user: { firstName: 'Ali', lastName: 'Ahmad', profileImage: { url: '/img.jpg' } } }
      },
    });
    const { findByText } = render(<EditProfileScreen />);
    expect(await findByText('Edit Profile')).toBeTruthy();
    expect(await findByText('Ali')).toBeTruthy();
    expect(await findByText('Ahmad')).toBeTruthy();
  });
});
