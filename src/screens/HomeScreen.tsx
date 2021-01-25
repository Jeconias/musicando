import {addDays, subDays} from 'date-fns';
import {capitalize} from 'lodash';
import {math, rgba} from 'polished';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';
import {SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Text from '~/components/Text';
import {AuthStackScreens, RootStackScreens} from '~/config/types';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import useNavigate from '~/hooks/useNavigate';
import {format} from '~/utils/date';

const today = new Date();

const HomeScreen = () => {
  const {to} = useNavigate();
  const {width, height} = useDeviceDimension();

  const handleGesture = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      return; //TODO(Jeconias): Restore it.
      if (
        event.nativeEvent.state === State.END &&
        event.nativeEvent.translationX < -40
      ) {
        to(RootStackScreens.AuthStack, {
          screen: AuthStackScreens.Opportunities,
        });
      }
    },
    [],
  );

  return (
    <SafeAreaView>
      <ContainerWithHeader iconLeft="sound" title="Dashboard">
        <HeaderBackground width={width} height={height}>
          {new Array(5).fill(null).map((_, k) => {
            const calc = 2 - k;
            if (k !== 2)
              return (
                <Day
                  key={k}
                  date={
                    calc > 0
                      ? subDays(today, calc)
                      : addDays(today, Math.abs(calc))
                  }
                />
              );
            return <Day key={k} date={today} withBackground />;
          })}
        </HeaderBackground>
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Content>
            <Section>
              <SectionTitle size="md">Próximo evento</SectionTitle>
              <NextEventCard>
                <View>
                  <NextEventTitle size="sm">
                    Título do próximo evento
                  </NextEventTitle>
                  <Text size="xs">Cidade, Estado</Text>
                </View>
                <NextEventActions>
                  <SeeEvent>
                    <Icon icon="arrowRight" />
                  </SeeEvent>
                </NextEventActions>
              </NextEventCard>
            </Section>
          </Content>
        </PanGestureHandler>
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default HomeScreen;

const Day = ({
  date,
  withBackground,
}: {
  date: Date;
  withBackground?: boolean;
}) => (
  <DateText withBackground={withBackground}>
    <Text size="md">{format(date, 'dd')}</Text>
    <Text size="xs">{capitalize(format(date, 'iii'))}</Text>
  </DateText>
);

const HeaderBackground = styled.View<{width: number; height: number}>`
  ${({theme, width, height}) => css`
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: ${width}px;
    height: ${Math.floor((height / 100) * 23)}px;
    background-color: ${theme.colors.backgroundOpacity};
    margin: -${math(`${theme.spacing.xlg} * 2`)} -${theme.spacing.md}
      ${theme.spacing.md} -${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  `}
`;

const DateText = styled.View<{withBackground?: boolean}>`
  ${({theme, withBackground}) => css`
    align-items: center;
    justify-content: center;
    height: 75px;
    margin: 0 ${theme.spacing.sm};

    ${withBackground &&
    css`
      padding: ${theme.spacing.xxs} ${theme.spacing.xs};
      border-radius: 36px;
      background-color: ${theme.colors.backgroundBlackSupport};
    `}
  `}
`;

const Content = styled.View`
  ${() => css`
    flex: 1;
  `}
`;

const Section = styled.View``;

const SectionTitle = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.xs};
  `}
`;

const NextEventCard = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing.sm};
    margin-right: -${theme.spacing.md};
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  `}
`;

const NextEventTitle = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.sm};
  `}
`;

const NextEventActions = styled.View`
  ${({theme}) => css``}
`;

const SeeEvent = styled.TouchableOpacity`
  ${({theme}) => css`
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 7px;
    background-color: ${rgba(theme.colors.white, 0.2)};
  `}
`;
