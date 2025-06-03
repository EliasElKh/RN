
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import VerifyOtpScreen from './VerifyOtpScreen';
import axios from 'axios';
import { Alert } from 'react-native';


jest.mock('axios');
jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({ params: { email: 'test@example.com' } }),
  useNavigation: () => ({ navigate: jest.fn() }),
}));
jest.mock('../../components/atoms/Input', () => ({
  Input: (props: any) => <input {...props} />,
}));
jest.mock('../../components/atoms/Label', () => ({
  Label: ({ text }: any) => <span>{text}</span>,
}));
jest.mock('../../components/atoms/Button', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Button: ({ title, onPress, disabled, testID }: any) => (
      <Text onPress={onPress} disabled={disabled} testID={testID || undefined}>
        {title}
      </Text>
    ),
  };
});

describe('VerifyOtpScreen - resendOtp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows success alert when resendOtp succeeds', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { success: true, data: { message: 'OTP sent!' } },
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByText } = render(<VerifyOtpScreen />);
    fireEvent.press(getByText('Resend OTP'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Success', 'OTP sent!');
    });

    alertSpy.mockRestore();
  });

  it('shows error alert when resendOtp fails with API error message', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { success: false, message: 'Invalid email' },
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByText } = render(<VerifyOtpScreen />);
    fireEvent.press(getByText('Resend OTP'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid email');
    });

    alertSpy.mockRestore();
  });

});
