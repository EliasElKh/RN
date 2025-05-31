import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from './HomeScreen';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((msg) => {
    if (
      msg.includes('not wrapped in act') ||
      msg.includes('act(...)')
    ) {return;}
    console.error(msg);
  });
});

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));



jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('axios');
jest.mock('../../components/organism/ProductList/ProductList', () => ({
  ProductList: () => <></>,
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Setup
const mockLogout = jest.fn();
const mockToggleTheme = jest.fn();
const mockNavigate = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    logout: mockLogout,
    accessToken: 'fake-token',
  });

  (useTheme as jest.Mock).mockReturnValue({
    toggleTheme: mockToggleTheme,
    theme: 'light',
  });

  (useNavigation as jest.Mock).mockReturnValue({
    navigate: mockNavigate,
  });

  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      data: {
        user: { id: 'user123' },
      },
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

// Tests
describe('HomeScreen', () => {
  it('renders all UI elements', async () => {
    const { getByPlaceholderText, getByText} = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByPlaceholderText('Search products...')).toBeTruthy();
      expect(getByText('Toggle Theme')).toBeTruthy();
      expect(getByText('Edit Profile')).toBeTruthy();
    });
  });

  it('calls logout when logout button is pressed', async () => {
    const { getByTestId } = render(<HomeScreen />);
    const logoutButton = getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('navigates to EditProfile on button press', async () => {
    const { getByText } = render(<HomeScreen />);
    const editButton = getByText('Edit Profile');
    fireEvent.press(editButton);
    expect(mockNavigate).toHaveBeenCalledWith('EditProfile');
  });

  it('updates search input', async () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Search products...');
    fireEvent.changeText(input, 'laptop');
    expect(input.props.value).toBe('laptop');
  });

  it('fetches user profile on mount', async () => {
    render(<HomeScreen />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://backend-practice.eurisko.me/api/user/profile',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer fake-token',
          }),
        }),
      );
    });
  });
});
