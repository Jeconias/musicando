import {useCallback, useRef, useState} from 'react';
import {Animated} from 'react-native';
import useDeviceDimension from './useDeviceDimension';

interface UseAnimationProps {}

const useAnimation = ({}: UseAnimationProps) => {
  const {width, height} = useDeviceDimension();

  const [animating, setAnimationg] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const xRightAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width + 100, 0],
  });
  const xLeftAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [(width + 100) * -1, 0],
  });

  const yDownAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [(height + 100) * -1, 0],
  });

  const startAnimation = useCallback(() => {
    if (animating) return;
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      delay: 150,
      friction: 15,
    }).start(() => setAnimationg(false));
  }, [animatedValue, animating, setAnimationg]);

  const resetAnimation = useCallback(() => {
    animatedValue.setValue(0);
  }, [animatedValue]);

  return {
    startAnimation,
    resetAnimation,
    xRightAnimation,
    xLeftAnimation,
    yDownAnimation,
  };
};

export default useAnimation;
