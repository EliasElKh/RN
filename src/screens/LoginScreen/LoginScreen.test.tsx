// import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { LoginScreen } from './LoginScreen';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

// Mock hooks and components
jest.mock('../../context/AuthContext');
jest.mock('@react-navigation/native');
jest.mock('../../context/ThemeContext/ThemeContext');
// At the top of your test file

// Then mock with those imported explicitly inside the factory function scope:


// Mock LoginForm properly with React Native components imported here:
jest.mock('../../components/organism/LoginForm', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');

  return {
    __esModule: true,
    LoginForm: function MockLoginForm(props: { error: any; isLoading: any; onLoginSuccess: any; onForgotPassword: any; }) {
      const { error, isLoading, onLoginSuccess, onForgotPassword } = props;

      return (
        <>
          <Text testID="error-text">{error || ''}</Text>
          <Text testID="loading-text">{isLoading ? 'Loading' : ''}</Text>
          <TouchableOpacity testID="login-button" onPress={() => onLoginSuccess('test@example.com', 'password')}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="forgot-button" onPress={() => onForgotPassword('test@example.com')}>
            <Text>Forgot Password</Text>
          </TouchableOpacity>
        </>
      );
    },
  };
});


describe('LoginScreen', () => {
  const mockedLogin = jest.fn();
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      login: mockedLogin,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockedNavigate,
    });

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
    });

    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders correctly with initial UI', () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText(/Welcome Back/i)).toBeTruthy();
    expect(getByText(/Please login to continue/i)).toBeTruthy();
  });

  it('calls login on successful login and shows loading', async () => {
    mockedLogin.mockResolvedValueOnce(undefined);
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.press(getByTestId('login-button'));

    // isLoading becomes true during login
    expect(getByTestId('loading-text').props.children).toBe('Loading');

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith('test@example.com', 'password');
      // isLoading should go back to false (empty string)
      expect(getByTestId('loading-text').props.children).toBe('');
    });
  });

  it('shows error message on login failure', async () => {
    mockedLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByTestId('error-text').props.children).toBe('Invalid credentials');
    });
  });

  describe('forgot password', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls fetch and shows success alert', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: { message: 'Reset email sent' },
        }),
      });

      const { getByTestId } = render(<LoginScreen />);

      fireEvent.press(getByTestId('forgot-button'));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'https://backend-practice.eurisko.me/api/auth/forgot-password',
          expect.objectContaining({
            method: 'POST',
          }),
        );
        expect(Alert.alert).toHaveBeenCalledWith('Success', 'Reset email sent');
      });
    });

    it('shows error alert on failed fetch response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: false,
          message: 'Email not found',
        }),
      });

      const { getByTestId } = render(<LoginScreen />);

      fireEvent.press(getByTestId('forgot-button'));

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Email not found');
      });
    });

    it('retries fetch and shows failure alert after 3 failed attempts', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const { getByTestId } = render(<LoginScreen />);

      fireEvent.press(getByTestId('forgot-button'));

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error',
          'Failed to send reset email after multiple attempts.',
        );
      });
      expect(fetch).toHaveBeenCalledTimes(3);
    });
  });

  it('navigates to SignUp screen on pressing Sign Up text', () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText(/Sign Up/i));

    expect(mockedNavigate).toHaveBeenCalledWith('SignUp');
  });
});
