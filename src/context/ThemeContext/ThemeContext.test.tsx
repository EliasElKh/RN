import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from './ThemeContext'; // adjust path if needed
import { Text, Button } from 'react-native';

const ThemeTestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Text testID="theme-value">{theme}</Text>
      <Button title="toggle" onPress={toggleTheme} />
    </>
  );
};

describe('ThemeProvider', () => {
  it('starts with light theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('theme-value').children[0]).toBe('light');
  });

  it('toggles between light and dark', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );
    // Toggle once (light -> dark)
    fireEvent.press(getByText('toggle'));
    expect(getByTestId('theme-value').children[0]).toBe('dark');
    // Toggle again (dark -> light)
    fireEvent.press(getByText('toggle'));
    expect(getByTestId('theme-value').children[0]).toBe('light');
  });
});
