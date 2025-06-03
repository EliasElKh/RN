import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { AddProductScreen } from './AddProductScreen';
import { Alert } from 'react-native';

jest.mock('react-native-push-notification', () => {

  return {
    localNotification: jest.fn(),
    createChannel: jest.fn(),
  };
});



jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ accessToken: 'mock-token' }),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
jest.mock('../../utils/permissions', () => ({
  requestStoragePermission: jest.fn(() => Promise.resolve(true)),
}));


jest.mock('react-native/Libraries/Components/ActivityIndicator/ActivityIndicator', () => 'ActivityIndicator');

describe('AddProductScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button', () => {
    const { getByPlaceholderText, getByText } = render(<AddProductScreen />);
    expect(getByPlaceholderText('Enter title')).toBeTruthy();
    expect(getByPlaceholderText('Enter description')).toBeTruthy();
    expect(getByPlaceholderText('Enter price')).toBeTruthy();
    expect(getByPlaceholderText('e.g. Cairo')).toBeTruthy();
    expect(getByPlaceholderText('e.g. 31.2357')).toBeTruthy();
    expect(getByPlaceholderText('e.g. 30.0444')).toBeTruthy();
    expect(getByText('Create Product')).toBeTruthy();
    expect(getByText('Select up to 5 images')).toBeTruthy();
  });

  it('shows alert if no images are selected', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<AddProductScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter title'), 'My Product');
    fireEvent.changeText(getByPlaceholderText('Enter description'), 'Description');
    fireEvent.changeText(getByPlaceholderText('Enter price'), '100');
    fireEvent.changeText(getByPlaceholderText('e.g. Cairo'), 'Cairo');
    fireEvent.changeText(getByPlaceholderText('e.g. 31.2357'), '31.2357');
    fireEvent.changeText(getByPlaceholderText('e.g. 30.0444'), '30.0444');
    fireEvent.press(getByText('Create Product'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Validation Error',
        'At least one image is required.'
      );
    });
  });

  it('calls image picker on press', async () => {
    const { getByText } = render(<AddProductScreen />);
    const { launchImageLibrary } = require('react-native-image-picker');
    launchImageLibrary.mockImplementation((_opts: any, cb: (arg0: { assets: { uri: string; }[]; }) => any) =>
      cb({ assets: [{ uri: 'mock://uri.jpg' }] })
    );
    await act(async () => {
      fireEvent.press(getByText('Select up to 5 images'));
    });
    expect(launchImageLibrary).toHaveBeenCalled();
  });

  it('submits product and shows success alert', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;


    const { getByPlaceholderText, getByText } = render(<AddProductScreen />);

    const { launchImageLibrary } = require('react-native-image-picker');
    launchImageLibrary.mockImplementation((_opts: any, cb: (arg0: { assets: { uri: string; fileName: string; type: string; }[]; }) => any) =>
      cb({ assets: [{ uri: 'mock://uri.jpg', fileName: 'file.jpg', type: 'image/jpeg' }] })
    );


    fireEvent.changeText(getByPlaceholderText('Enter title'), 'My Product');
    fireEvent.changeText(getByPlaceholderText('Enter description'), 'A Description');
    fireEvent.changeText(getByPlaceholderText('Enter price'), '120');
    fireEvent.changeText(getByPlaceholderText('e.g. Cairo'), 'Cairo');
    fireEvent.changeText(getByPlaceholderText('e.g. 31.2357'), '31.2357');
    fireEvent.changeText(getByPlaceholderText('e.g. 30.0444'), '30.0444');


    await act(async () => {
      fireEvent.press(getByText('Select up to 5 images'));
    });


    await act(async () => {
      fireEvent.press(getByText('Create Product'));
    });


    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Product created successfully.'
      )
    );
    const PushNotification = require('react-native-push-notification');
    expect(PushNotification.localNotification).toHaveBeenCalledWith({
      channelId: 'CreateProduct-channel',
      title: 'Product Created',
      message: 'Your product has been created successfully.',
    });
  });
});
