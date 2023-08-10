import { StyleSheet } from 'react-native';
import { Dimensions, Platform, PixelRatio } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,

  },
});

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
export const screen = { SCREEN_WIDTH, SCREEN_HEIGHT };
