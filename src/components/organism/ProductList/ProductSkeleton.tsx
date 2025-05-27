import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import { moderateScale } from '../../../utils/scalingUtils';

export default function ProductSkeleton() {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: moderateScale(8),
          padding: moderateScale(10),
          marginBottom: moderateScale(10),
        }}
      >
        {/* Swiper/Image */}
        <View
          style={{
            height: moderateScale(300),
            borderRadius: moderateScale(8),
            marginBottom: moderateScale(10),
          }}
        />
        {/* Title */}
        <View
          style={{
            width: '60%',
            height: 22,
            borderRadius: 4,
            marginTop: moderateScale(10),
          }}
        />
        {/* Description */}
        <View
          style={{
            width: '90%',
            height: 16,
            borderRadius: 4,
            marginTop: moderateScale(5),
          }}
        />
        {/* Price */}
        <View
          style={{
            width: '25%',
            height: 18,
            borderRadius: 4,
            marginTop: moderateScale(5),
          }}
        />

        {/* Buttons Row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: moderateScale(10),
          }}
        >
          <View
            style={{
              flex: 1,
              height: 36,
              borderRadius: 4,
              marginRight: moderateScale(5),
            }}
          />
          <View
            style={{
              flex: 1,
              height: 36,
              borderRadius: 4,
              marginLeft: moderateScale(5),
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}