jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(() => Promise.resolve({ assets: [{ uri: 'mock-uri', fileName: 'img.jpg', type: 'image/jpeg' }] })),
}));

jest.mock('../../../utils/permissions', () => ({
  requestStoragePermission: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('axios');
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignUpForm } from './signUpForm';
import axios from 'axios';

const mockPost = jest.fn();
(axios.post as jest.Mock) = mockPost;

describe('SignUpForm', () => {
  it('shows validation errors if fields are empty', async () => {
    const { getByText, getAllByText } = render(<SignUpForm />);

    const signUpButton = getByText('Sign Up');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(getAllByText('Required')).toHaveLength(4);
    });
  });

  it('submits form successfully', async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        success: true,
        data: { message: 'Signup successful' },
      },
    });

    const { getByPlaceholderText, getByText } = render(<SignUpForm />);

    fireEvent.changeText(getByPlaceholderText('John'), 'Jane');
    fireEvent.changeText(getByPlaceholderText('Doe'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('email@example.com'), 'jane@example.com');
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'secret123');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalled();
    });
  });
});
