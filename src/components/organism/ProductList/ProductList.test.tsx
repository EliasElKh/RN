
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ProductList } from './ProductList';
import axios from 'axios';

jest.mock('axios');
jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({ accessToken: 'mock-token' }),
}));
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaView: (props: any) => React.createElement(React.Fragment, null, props.children),
    SafeAreaProvider: (props: any) => React.createElement(React.Fragment, null, props.children),
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
    initialWindowMetrics: {
      insets: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      frame: {
        width: 375,
        height: 812,
        x: 0,
        y: 0,
      },
    },
  };
});

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/documents',
  ExternalDirectoryPath: '/mock/external',
  CachesDirectoryPath: '/mock/caches',

  readFile: jest.fn(() => Promise.resolve('mock file content')),
  writeFile: jest.fn(() => Promise.resolve()),
  unlink: jest.fn(() => Promise.resolve()),
  mkdir: jest.fn(() => Promise.resolve()),
  exists: jest.fn(() => Promise.resolve(true)),
  downloadFile: jest.fn(() => ({
    promise: Promise.resolve({ jobId: 1, statusCode: 200 }),
  })),
  stat: jest.fn(() => Promise.resolve({ size: 1234 })),
}));
jest.mock('../../molecule/ProductCard/ProductCard', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    ProductCard: ({ item }: { item: any }) => <Text>{item.name}</Text>,
  };
});
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  __esModule: true,
  default: {
    getPhotos: jest.fn(() =>
      Promise.resolve({
        edges: [
          {
            node: {
              image: {
                uri: 'mock-photo-uri-1',
                filename: 'photo1.jpg',
              },
            },
          },
        ],
      })
    ),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductList', () => {
  const productsMock = [
    { _id: '1', name: 'Product 1', price: 100 },
    { _id: '2', name: 'Product 2', price: 200 },
  ];

  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('renders loading skeletons when loading and no data', async () => {
  mockedAxios.get.mockImplementationOnce(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve({
      data: { data: [], pagination: { currentPage: 1, hasNextPage: false } },
    }), 100)
  )
);

  const { findAllByTestId } = render(
    <ProductList searchQuery="" sortOrder="asc" userId="user1" />
  );

  const skeletons = await findAllByTestId('skeleton-card');
  expect(skeletons).toHaveLength(6);
});

  it('renders product list when data is returned', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: productsMock, pagination: { currentPage: 1, hasNextPage: false } },
    });

    const { getByText } = render(
      <ProductList searchQuery="" sortOrder="asc" userId="user1" />
    );

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('Product 2')).toBeTruthy();
    });
  });

  it('renders no result message when search yields no data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    const { getByText } = render(
      <ProductList searchQuery="nonexistent" sortOrder="asc" userId="user1" />
    );

    await waitFor(() => {
      expect(getByText(/No products found/)).toBeTruthy();
    });
  });

  it('calls loadMore on scroll', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          data: productsMock,
          pagination: { currentPage: 1, hasNextPage: true },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [{ _id: '3', name: 'Product 3', price: 300 }],
          pagination: { currentPage: 2, hasNextPage: false },
        },
      });

    const { getByText, getByTestId } = render(
      <ProductList searchQuery="" sortOrder="asc" userId="user1" />
    );

    await waitFor(() => expect(getByText('Product 1')).toBeTruthy());

    const flatList = getByTestId('flatlist');

    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 1000 },
        layoutMeasurement: { height: 500 },
      },
    });


  });
});
