import {Dimensions, PixelRatio, Platform} from 'react-native';

const deviceDimensions = Dimensions.get('window');
const scale = deviceDimensions.width / 420;

export const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
