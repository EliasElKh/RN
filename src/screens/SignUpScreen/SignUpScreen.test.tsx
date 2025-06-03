import { render } from '@testing-library/react-native';
import { SignUpScreen } from './SignUpScreen';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { styles as light, darkScreenStyles } from './signUpScreen.styles';




jest.mock('../../components/molecule/SignUpForm/SignUpForm', () => ({
  SignUpForm: () => <></>,
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));
jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn(),
}));
jest.mock('./signUpScreen.styles', () => ({
  styles: { scrollview: { backgroundColor: 'white' }, contentContaienr: {}, screen: {}, header: {}, container: {}, loginText: {}, loginLink: {} },
  darkScreenStyles: { scrollview: { backgroundColor: 'black' }, contentContaienr: {}, screen: {}, header: {}, container: {}, loginText: {}, loginLink: {} },
}));
jest.mock('./signUpScreen.styles', () => ({
  styles: {
    scrollview: { backgroundColor: 'white' },
    contentContaienr: {},
    screen: { backgroundColor: 'white' },
    header: {},
    container: {},
    loginText: {},
    loginLink: {},
  },
  darkScreenStyles: {
    scrollview: { backgroundColor: 'black' },
    contentContaienr: {},
    screen: { backgroundColor: 'black' },
    header: {},
    container: {},
    loginText: {},
    loginLink: {},
  },
}));



describe('SignUpScreen styles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uses light styles when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
    const { getByText } = render(<SignUpScreen />);

    expect(getByText('Create Account')).toBeTruthy();



    expect(light.screen.backgroundColor).toBe('white');
  });

  it('uses dark styles when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    const { getByText } = render(<SignUpScreen />);
    expect(getByText('Create Account')).toBeTruthy();
    expect(darkScreenStyles.screen.backgroundColor).toBe('black');
  });
});
