import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, View, Text} from 'react-native';
import { ProductCard } from '../../molecule/ProductCard/ProductCard';
import axios, { AxiosRequestConfig } from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { ProductListProps } from './ProductList.types';
import { styles } from './ProductList.styles';
import ProductSkeleton from './ProductSkeleton';
import crashlytics from '@react-native-firebase/crashlytics';
import { API_URL } from '@env';




const fetchWithRetry = async (url: string, options: AxiosRequestConfig<any> | undefined, maxRetries = 3, delayMs = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await axios.get(url, options);
    } catch (error) {
      if (attempt === maxRetries) { throw error; }
      await new Promise((res) => setTimeout(() => res(undefined), delayMs));
    }
  }
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const ProductList: React.FC<ProductListProps> = ({ searchQuery, sortOrder, userId }) => {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 5;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const isSearch = !!debouncedSearchQuery?.trim();

  const fetchProducts = useCallback(
    async (page = 1, isRefresh = false) => {
      try {
        if (isRefresh || page === 1) {
          setLoading(true);
        }

        const baseUrl = isSearch
          ? `${API_URL}/api/products/search`
          : `${API_URL}/api/products`;

        const params = isSearch
          ? { query: debouncedSearchQuery }
          : { page, limit, ...(sortOrder ? { sortBy: 'price', order: sortOrder } : {}) };

        const response = await fetchWithRetry(baseUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          params,
        });


        const fetched = response?.data?.data ?? [];

        if (isRefresh || isSearch) {
          setProducts(fetched);
        } else {
          setProducts(prev => [...prev, ...fetched]);
        }

        if (!isSearch) {
          setCurrentPage(response?.data?.pagination?.currentPage ?? 1);
          setHasNextPage(response?.data?.pagination?.hasNextPage ?? false);
        } else {
          setCurrentPage(1);
          setHasNextPage(false);
        }
      } catch (error) {
        crashlytics().recordError(error as Error);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [accessToken, debouncedSearchQuery, sortOrder, limit, isSearch]
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, true);
  }, [fetchProducts]);

  const loadMore = async () => {
    if (loadingMore || !hasNextPage || isSearch) {return;}
    setLoadingMore(true);
    await fetchProducts(currentPage + 1);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts(1, true);
  };

  // if (loading && products.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  if (isSearch && !loading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noResultsText}>No products found for "{debouncedSearchQuery}"</Text>
      </View>
    );
  }
  if (loading && products.length === 0) {
  return (
    <FlatList
      data={Array.from({ length: 6 })}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => <ProductSkeleton />}
      contentContainerStyle={styles.containerFlatList}
    />
  );
}

  return (
    <FlatList
      data={products}
      testID="flatlist"
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          userId={userId}
          onDeleteSuccess={(deletedId) => {
            setProducts((prev) => prev.filter((p) => p._id !== deletedId));
          }}
        />
      )}

      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
  );
};


