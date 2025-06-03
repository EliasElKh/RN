
import React from 'react';
import { render } from '@testing-library/react-native';
import { EditProfileScreen } from './EditProfileScreen';


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


jest.mock('../../components/molecule/LabeledInput', () => {
  const { Text } = require('react-native');
  return {
    LabeledInput: ({value }: { label: string; value: string }) => (
      <Text>{value}</Text>
    ),
  };
});
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


    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders profile fields after successful fetch', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        success: true,
        data: { user: { firstName: 'Ali', lastName: 'Ahmad', profileImage: { url: '/img.jpg' } } },
      },
    });
    const { findByText } = render(<EditProfileScreen />);

    expect(await findByText('Ali')).toBeTruthy();
    expect(await findByText('Ahmad')).toBeTruthy();
  });
});
