import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './input';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Input', () => {
  it('renders with the correct value', () => {
    const { getByDisplayValue } = render(
      <Input value="test input" onChangeText={jest.fn()} />,
      { wrapper: AllProviders }
    );

    expect(getByDisplayValue('test input')).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const mockChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={mockChange} />,
      { wrapper: AllProviders }
    );

    const input = getByPlaceholderText('');
    fireEvent.changeText(input, 'new text');

    expect(mockChange).toHaveBeenCalledWith('new text');
  });

  it('applies error border style when isError is true', () => {
    const { getByTestId } = render(
      <Input value="error" onChangeText={jest.fn()} isError />,
      {
        wrapper: AllProviders,
      }
    );

    const input = getByTestId('text-input');
    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderColor: expect.any(String) })])
    );
  });
});
