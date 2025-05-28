import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginForm } from './LoginForm';

jest.mock('../../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('LoginForm', () => {
  it('shows validation errors when fields are empty', async () => {
    const { getByText, getAllByText } = render(
      <LoginForm onLoginSuccess={jest.fn()} onForgotPassword={jest.fn()} isLoading={false} />
    );

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getAllByText('Required')).toHaveLength(2);
    });
  });

  it('calls onLoginSuccess with correct credentials', async () => {
    const mockLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <LoginForm onLoginSuccess={mockLogin} onForgotPassword={jest.fn()} isLoading={false} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'secret');

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'secret');
    });
  });

  it('calls onForgotPassword with current email', async () => {
    const mockForgot = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <LoginForm onLoginSuccess={jest.fn()} onForgotPassword={mockForgot} isLoading={false} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'forgot@example.com');
    fireEvent.press(getByText('Forgot Password?'));

    await waitFor(() => {
      expect(mockForgot).toHaveBeenCalledWith('forgot@example.com');
    });
  });
});