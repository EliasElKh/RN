import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LabeledInput } from './labeledInput';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('LabeledInput', () => {
  it('renders label and input with correct values', () => {
    const { getByText, getByDisplayValue } = render(
      <LabeledInput
        label="Username"
        value="JohnDoe"
        onChangeText={jest.fn()}
      />,
      { wrapper: AllProviders }
    );

    expect(getByText('Username')).toBeTruthy();
    expect(getByDisplayValue('JohnDoe')).toBeTruthy();
  });

  it('calls onChangeText when input changes', () => {
    const mockChange = jest.fn();

    const { getByDisplayValue } = render(
      <LabeledInput
        label="Username"
        value=""
        onChangeText={mockChange}
        placeholder="Enter your username"
      />,
      { wrapper: AllProviders }
    );

    const input = getByDisplayValue('');
    fireEvent.changeText(input, 'new input');

    expect(mockChange).toHaveBeenCalledWith('new input');
  });
});