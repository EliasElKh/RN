import React from 'react';
import { render } from '@testing-library/react-native';
import { Label } from './label';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Label', () => {
  it('renders the label text', () => {
    const { getByText } = render(<Label text="Hello Label" />, {
      wrapper: AllProviders,
    });

    expect(getByText('Hello Label')).toBeTruthy();
  });
});