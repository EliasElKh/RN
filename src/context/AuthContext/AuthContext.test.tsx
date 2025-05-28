import React, { act } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthProvider, useAuth } from './AuthContext';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

jest.mock('axios');
jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// A real consumer component that renders UI
const TestScreen = () => {
  const {
    isLoggedIn,
    accessToken,
    login,
    logout,
  } = useAuth();
  return (
    <>
      <Text testID="login-status">{isLoggedIn ? 'LOGGED_IN' : 'LOGGED_OUT'}</Text>
      <Text testID="token">{accessToken ?? 'NO_TOKEN'}</Text>
      <Text testID="login-btn" onPress={() => login('user@example.com', 'pw')}>Login</Text>
      <Text testID="logout-btn" onPress={logout}>Logout</Text>
    </>
  );
};

import { Text } from 'react-native';

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts as logged out', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestScreen />
      </AuthProvider>
    );

    expect(getByTestId('login-status').children[0]).toBe('LOGGED_OUT');
    expect(getByTestId('token').children[0]).toBe('NO_TOKEN');
  });

  it('logs in successfully and saves tokens', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
      },
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestScreen />
      </AuthProvider>
    );

    // Simulate pressing "login" button
    await act(async () => {
      fireEvent.press(getByTestId('login-btn'));
    });

    expect(getByTestId('login-status').children[0]).toBe('LOGGED_IN');
    expect(getByTestId('token').children[0]).toBe('mock-access-token');
    expect(EncryptedStorage.setItem).toHaveBeenCalled();
  });

  it('logs out and clears tokens', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
      },
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestScreen />
      </AuthProvider>
    );

    // Login first
    await act(async () => {
      fireEvent.press(getByTestId('login-btn'));
    });

    // Logout
    await act(async () => {
      fireEvent.press(getByTestId('logout-btn'));
    });

    expect(getByTestId('login-status').children[0]).toBe('LOGGED_OUT');
    expect(getByTestId('token').children[0]).toBe('NO_TOKEN');
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith('auth_tokens');
  });
});
