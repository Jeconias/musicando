import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
  State,
} from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';
import {fonts, SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Text from '~/components/Text';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import useNavigate from '~/hooks/useNavigate';
import Animated, {Easing} from 'react-native-reanimated';
import {AppStackScreens, RootStackScreens} from '~/config/types';
import OpportunityCard from '~/components/Card/OpportunityCard';

const DATABASE = [
  {
    id: '1',
    name: 'Ruana Lima',
    description: 'Alguma descrição do usuário aqui para que descreva algo.',
    price: 1217,
  },
  {
    id: '2',
    name: 'Marcos Lima',
    description: 'Alguma descrição do usuário aqui para que descreva algo.',
    price: 1205,
  },
  {
    id: '3',
    name: 'Mario Lima',
    description: 'Alguma descrição do usuário aqui para que descreva algo.',
    price: 1250.21,
  },
  {
    id: '4',
    name: 'José Lima',
    description: 'Alguma descrição do usuário aqui para que descreva algo.',
    price: 10.21,
  },
  {
    id: '5',
    name: 'Você Lima',
    description: 'Alguma descrição do usuário aqui para que descreva algo.',
    price: 120.26,
  },
];

const OpportunitiesScreen = () => {
  const {to} = useNavigate();
  const {height} = useDeviceDimension();

  const heightMemorized = useMemo(() => Math.ceil(height * (25 / 100)), [
    height,
  ]);

  const [swipeIsOpen, setSwipeIsOpen] = useState(false);
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

  const handleOnSelected = useCallback(() => {
    to(RootStackScreens.AppStack, {screen: AppStackScreens.UserProfile});
  }, [to]);

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
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            paddingRight: 8,
          }}
          data={DATABASE}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <OpportunityCard {...(item as any)} />}
        />
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
                <CircledOption>
                  <Icon icon="music" size="md" />
                </CircledOption>
                <CircledOption>
                  <Icon icon="event" size="md" />
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
    background-color: ${theme.colors.backgroundBlackSupport};
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
  ${({theme}) => css`
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${theme.colors.backgroundBlackOpacity};
    margin: 0 ${theme.spacing.xs};
  `}
`;
