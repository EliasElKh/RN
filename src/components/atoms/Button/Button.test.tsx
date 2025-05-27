import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

// Helper to wrap with theme context
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button', () => {
  it('renders the button title', () => {
    const { getByText } = render(<Button title="Click me" onPress={jest.fn()} />, {
      wrapper: AllProviders,
    });
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Press" onPress={onPress} />, {
      wrapper: AllProviders,
    });
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Disabled" onPress={onPress} disabled />, {
      wrapper: AllProviders,
    });
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
