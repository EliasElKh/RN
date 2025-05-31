jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  getPhotos: jest.fn(() => Promise.resolve({ edges: [], page_info: {} })),
  save: jest.fn(() => Promise.resolve('mocked-uri')),
  deletePhotos: jest.fn(() => Promise.resolve()),
}));
jest.mock('react-native-fs', () => ({
  readDir: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(() => Promise.resolve(true)),
  mkdir: jest.fn(),
  downloadFile: jest.fn(() => ({
    promise: Promise.resolve({ statusCode: 200 }),
  })),
  DocumentDirectoryPath: '/mocked/document/path',
  ExternalDirectoryPath: '/mocked/external/path',
}));
// jest.setup.js
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    GestureHandlerRootView: View,
    TouchableOpacity: View,
    TouchableHighlight: View,
    TouchableWithoutFeedback: View,
    PanGestureHandler: View,
    TapGestureHandler: View,
    State: {},
  };
});
// jest.setup.ts
jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  localNotification: jest.fn(),
  localNotificationSchedule: jest.fn(),
  cancelAllLocalNotifications: jest.fn(),
  cancelLocalNotifications: jest.fn(),
  requestPermissions: jest.fn(),
  checkPermissions: jest.fn((cb: Function) => cb({ alert: true, badge: true, sound: true })),
  createChannel: jest.fn((_: any, cb: Function) => cb(true)),
  deleteChannel: jest.fn(),
  getChannels: jest.fn((cb: Function) => cb(['default'])),
  abandonPermissions: jest.fn(),
}));

Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});
jest.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};

  return {
    setItem: jest.fn(async (key: string, value: string) => {
      store[key] = value;
      return null;
    }),
    getItem: jest.fn(async (key: string) => {
      return store[key] || null;
    }),
    removeItem: jest.fn(async (key: string) => {
      delete store[key];
      return null;
    }),
    clear: jest.fn(async () => {
      store = {};
      return null;
    }),
    getAllKeys: jest.fn(async () => {
      return Object.keys(store);
    }),
  };
});
