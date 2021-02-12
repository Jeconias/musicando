import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {Easing} from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';
import {SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Text from '~/components/Text';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import OpportunitiesEvent from './OpportunitiesEvent';
import OpportunitiesUser from './OpportunitiesUser';

const OpportunitiesScreen = () => {
  const {height} = useDeviceDimension();

  const heightMemorized = useMemo(() => Math.ceil(height * (25 / 100)), [
    height,
  ]);

  const [swipeIsOpen, setSwipeIsOpen] = useState(false);
  const [filter, setFilter] = useState<{type: 'event' | 'user'}>({
    type: 'event',
  });
  const swipeAnimate = useRef(new Animated.Value(0)).current;

  const handleSwipeAnimate = useCallback(() => {
    Animated.timing(swipeAnimate, {
      duration: swipeIsOpen ? 200 : 300,
      toValue: swipeIsOpen ? 0 : 1,
      easing: Easing.linear,
    }).start(() => {
      setSwipeIsOpen((prev) => !prev);
    });
  }, [swipeIsOpen, swipeAnimate]);

  /* const handleOnSelected = useCallback(() => {
    to(RootStackScreens.AppStack, {screen: AppStackScreens.UserProfile});
  }, [to]); */

  const handleToggleFilterType = useCallback(() => {
    setFilter((prev) => ({
      ...prev,
      type: prev.type === 'event' ? 'user' : 'event',
    }));
    handleSwipeAnimate();
  }, [setFilter, handleSwipeAnimate]);

  const handleGesture = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      if (
        event.nativeEvent.state === State.END &&
        event.nativeEvent.translationY > 40
      ) {
        handleSwipeAnimate();
      }
    },
    [handleSwipeAnimate],
  );

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconRight={{
          icon: 'filter',
          onPress: handleSwipeAnimate,
        }}
        title="Oportunidades">
        {filter.type === 'event' && <OpportunitiesEvent />}
        {filter.type === 'user' && <OpportunitiesUser />}
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Filter
            height={heightMemorized}
            style={{
              transform: [
                {
                  translateY: swipeAnimate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [heightMemorized, 0],
                  }),
                },
              ],
            }}>
            <FilterBar />
            <FilterSection>
              <Text size="md">Tipo</Text>
              <FilterOptions>
                <CircledOption
                  disabled={filter.type === 'event'}
                  onPress={handleToggleFilterType}>
                  <Icon icon="event" size="md" />
                </CircledOption>
                <CircledOption
                  disabled={filter.type === 'user'}
                  onPress={handleToggleFilterType}>
                  <Icon icon="music" size="md" />
                </CircledOption>
              </FilterOptions>
            </FilterSection>
          </Filter>
        </PanGestureHandler>
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default OpportunitiesScreen;

const Filter = styled(Animated.View)<{height: number}>`
  ${({theme, height}) => css`
    position: absolute;
    right: -${theme.spacing.md};
    bottom: -${theme.spacing.md};
    left: -${theme.spacing.md};
    padding: ${theme.spacing.md};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: ${height}px;
    background-color: ${theme.colors.backgroundBlackOpacity};
  `}
`;

const FilterBar = styled.View`
  ${({theme}) => css`
    margin: -${theme.spacing.xs} auto ${theme.spacing.sm};
    background-color: ${theme.colors.white};
    width: 80px;
    height: 3px;
    border-radius: 7px;
  `}
`;

const FilterSection = styled.View``;

const FilterOptions = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    padding-top: ${theme.fontSize.xxs};
    margin: 0 -${theme.spacing.xs};
  `}
`;

const CircledOption = styled.TouchableOpacity`
  ${({theme, disabled}) => css`
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: ${theme.colors.backgroundBlack};
    border-radius: 25px;
    margin: 0 ${theme.spacing.xs};

    ${!disabled &&
    css`
      background-color: ${theme.colors.backgroundBlackSupport};
    `}
  `}
`;
