import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { VerificationForm } from './VerificationForm';

jest.mock('../../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('VerificationForm', () => {
  it('shows error if OTP is incomplete', async () => {
    const mockVerifySuccess = jest.fn();
    const { getByText } = render(<VerificationForm onVerificationSuccess={mockVerifySuccess} />);

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(getByText('Please enter a valid 4-digit OTP')).toBeTruthy();
      expect(mockVerifySuccess).not.toHaveBeenCalled();
    });
  });

  it('shows error if OTP is incorrect', async () => {
    const mockVerifySuccess = jest.fn();
    const { getByText, getByTestId } = render(<VerificationForm onVerificationSuccess={mockVerifySuccess} />);

    const inputs = [getByTestId('otp-input-0'), getByTestId('otp-input-1'), getByTestId('otp-input-2'), getByTestId('otp-input-3')];
    fireEvent.changeText(inputs[0], '9');
    fireEvent.changeText(inputs[1], '8');
    fireEvent.changeText(inputs[2], '7');
    fireEvent.changeText(inputs[3], '6');

    fireEvent.press(getByText('Verify'));

    await waitFor(() => {
      expect(getByText('Please enter a valid 4-digit OTP')).toBeTruthy();
      expect(mockVerifySuccess).not.toHaveBeenCalled();
    });
  });

  it('calls onVerificationSuccess when correct OTP is entered', async () => {
    const mockVerifySuccess = jest.fn();
    const { getByText, getByTestId} = render(<VerificationForm onVerificationSuccess={mockVerifySuccess} />);

    const inputs = [getByTestId('otp-input-0'), getByTestId('otp-input-1'), getByTestId('otp-input-2'), getByTestId('otp-input-3')];
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');

    fireEvent.press(getByText('Verify'));

    await waitFor(() => {
      expect(mockVerifySuccess).toHaveBeenCalledTimes(1);
    });
  });
});
