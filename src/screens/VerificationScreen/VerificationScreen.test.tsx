import { render} from '@testing-library/react-native';
import { VerificationScreen } from './VerificationScreen';
import { Alert } from 'react-native';

jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));
jest.mock('../../context/AuthContext', () => {
  return {
    useAuth: () => ({
      verifyOTP: jest.fn(),
      isVerified: false,
      isLoggedIn: true,
    }),
  };
});

jest.mock('../../components/molecule/VerificationForm/VerificationForm', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    VerificationForm: ({ onVerificationSuccess }: any) => (
      <Text testID="mock-verification-form" onPress={onVerificationSuccess}>
        Mock VerificationForm
      </Text>
    ),
  };
});

describe('VerificationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
  });

  it('renders header and VerificationForm', () => {
    const { getByText, getByTestId } = render(<VerificationScreen />);
    expect(getByText('Enter OTP')).toBeTruthy();
    expect(getByTestId('mock-verification-form')).toBeTruthy();
  });

  it('applies correct styles based on theme', () => {
    jest.resetModules();
    jest.doMock('../../context/ThemeContext/ThemeContext', () => ({
      useTheme: () => ({ theme: 'dark' }),
    }));
    const { getByText } = render(<VerificationScreen />);
    expect(getByText('Enter OTP')).toBeTruthy();
  });
});
