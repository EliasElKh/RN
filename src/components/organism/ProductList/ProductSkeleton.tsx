// src/components/ProductSkeleton/ProductSkeleton.tsx
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import { styles } from './ProductSkeleton.styles';

export default function ProductSkeleton() {
  return (
    <View testID="skeleton-card">
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={styles.image} />
          <View style={styles.title} />
          <View style={styles.description} />
          <View style={styles.price} />
          <View style={styles.buttonRow}>
            <View style={[styles.button, styles.buttonMarginRight]} />
            <View style={[styles.button, styles.buttonMarginLeft]} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}
