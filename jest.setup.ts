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
