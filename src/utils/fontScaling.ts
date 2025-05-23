
import { PixelRatio, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375;

export const scaleFont = (size: number) => {
  const scale = width / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
