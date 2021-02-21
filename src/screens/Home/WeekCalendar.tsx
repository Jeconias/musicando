import {addDays, subDays} from 'date-fns';
import {capitalize} from 'lodash';
import {math} from 'polished';
import React, {useCallback} from 'react';
import styled, {css} from 'styled-components/native';
import Text from '~/components/Text';
import {Deal} from '~/core/entity/deal';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import {format, isEqualDate} from '~/utils/date';
import {DealEntityResponse} from '~/core/api/api.deal.types';
import useAnimation from '~/hooks/useAnimation';
import {useFocusEffect} from '@react-navigation/native';
import {Animated} from 'react-native';

interface WeekCalendarInterface {
  today: Date;
  deal: DealEntityResponse | undefined;
}

const WeekCalendar = ({today, deal}: WeekCalendarInterface) => {
  const {width, height} = useDeviceDimension();

  const {startAnimation, resetAnimation, yDownAnimation} = useAnimation({});

  const onFocus = useCallback(() => {
    startAnimation();
    return () => {
      resetAnimation();
    };
  }, [startAnimation, resetAnimation]);

  useFocusEffect(onFocus);

  return (
    <Wrapper
      width={width}
      height={height}
      style={{transform: [{translateY: yDownAnimation}]}}>
      {new Array(5).fill(null).map((_, k) => {
        const eventDate = deal?.proposal?.event?.date
          ? new Date(deal.proposal.event.date || '')
          : undefined;
        const calc = 2 - k;
        if (k !== 2) {
          const isIncrement = calc < 0;
          const date = isIncrement
            ? addDays(today, Math.abs(calc))
            : subDays(today, calc);
          const withDot = isEqualDate(date, eventDate);
          return <Day key={k} date={date} withDot={withDot && isIncrement} />;
        } else {
          const withDot = isEqualDate(today, eventDate);
          return <Day key={k} date={today} withBackground withDot={withDot} />;
        }
      })}
    </Wrapper>
  );
};

export default WeekCalendar;

const Wrapper = styled(Animated.View)<{width: number; height: number}>`
  ${({theme, width, height}) => css`
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: ${width}px;
    height: ${Math.floor((height / 100) * 23)}px;
    background-color: ${theme.colors.backgroundBlackOpacity};
    margin: -${math(`${theme.spacing.xlg} * 2`)} -${theme.spacing.md}
      ${theme.spacing.md} -${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  `}
`;

const Day = ({
  date,
  withBackground,
  withDot,
}: {
  date: Date;
  withBackground?: boolean;
  withDot?: boolean;
}) => (
  <DateText withBackground={withBackground}>
    <Text size="md">{format(date, 'dd')}</Text>
    <Text size="xs">{capitalize(format(date, 'iiiiii'))}</Text>
    {withDot && <DateDot />}
  </DateText>
);

const DateText = styled.View<{withBackground?: boolean}>`
  ${({theme, withBackground}) => css`
    position: relative;
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

const DateDot = styled.View`
  ${({theme}) => css`
    position: absolute;
    bottom: 5px;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: ${theme.colors.primary};
  `}
`;
