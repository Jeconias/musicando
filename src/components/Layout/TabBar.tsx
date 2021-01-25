import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useCallback, useRef} from 'react';
import Animated, {Easing, Extrapolate} from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';
import Text from '~/components/Text';
import useDeviceDimension from '~/hooks/useDeviceDimension';

interface TabBarInterface extends BottomTabBarProps {}

interface Route {
  key: string;
  name: string;
  index: number;
}

const TabBar = ({state, descriptors, navigation}: TabBarInterface) => {
  const {width} = useDeviceDimension();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const barAnimate = useRef(new Animated.Value(0)).current;

  const sizeBar = width / state.routes.length;

  const handleOnFocusChange = useCallback(
    ({
      route,
      onAnimationFinished,
    }: {
      route: Route;
      onAnimationFinished?: () => void;
    }) => {
      Animated.timing(barAnimate, {
        duration: 250,
        toValue: route.index,
        easing: Easing.linear,
      }).start(onAnimationFinished);
    },
    [barAnimate],
  );

  const handleOnPress = useCallback(
    ({route, isFocused}: {route: Route; isFocused: boolean}) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        handleOnFocusChange({
          route,
          onAnimationFinished: () => {
            navigation.navigate(route.name);
          },
        });
      }
    },
    [handleOnFocusChange, navigation],
  );

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <TabBarContainer>
      <TopBorder>
        <Bar
          sizeBar={sizeBar}
          style={{
            transform: [
              {
                translateX: barAnimate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, sizeBar],
                  extrapolate: Extrapolate.EXTEND,
                }),
              },
            ],
          }}
        />
      </TopBorder>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        if (isFocused) handleOnFocusChange({route: {...route, index}});

        return (
          <WrapperButton key={index} width={sizeBar}>
            <TouchableOpacityStyled
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() =>
                handleOnPress({
                  route: {name: route.name, key: route.key, index},
                  isFocused,
                })
              }>
              <Text size="xs" color="white">
                {(label as string) ?? ''}
              </Text>
            </TouchableOpacityStyled>
          </WrapperButton>
        );
      })}
    </TabBarContainer>
  );
};

export default TabBar;

const TabBarContainer = styled.View`
  ${({theme}) => css`
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.backgroundBlackSupport};
  `}
`;

const WrapperButton = styled.View<{width: number}>`
  ${({theme, width}) => css`
    align-items: center;
    width: ${width}px;
    padding: ${theme.spacing.xs} 0;
  `}
`;

const TouchableOpacityStyled = styled.TouchableOpacity`
  ${({theme}) => css`
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  `}
`;

const TopBorder = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background-color: ${({theme}) => theme.colors.white};
`;

const Bar = styled(Animated.View)<{sizeBar: number}>`
  ${({theme, sizeBar}) => css`
    width: ${sizeBar}px;
    height: 100%;
    background-color: ${theme.colors.primary};
  `}
`;
