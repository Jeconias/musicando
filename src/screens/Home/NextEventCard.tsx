import {useFocusEffect} from '@react-navigation/native';
import {rgba} from 'polished';
import React, {Fragment, useCallback} from 'react';
import {Animated, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import Icon from '~/components/Icon';
import Text from '~/components/Text';
import {AppStackScreens, RootStackScreens} from '~/config/types';
import {Deal} from '~/core/entity/deal';
import useAnimation from '~/hooks/useAnimation';
import useNavigate from '~/hooks/useNavigate';
import {format} from '~/utils/date';
import {capitalizeByIndex} from '~/utils/string';
import {DealEntityResponse} from '~/core/api/api.deal.types';

interface NextEventInterface {
  deal: DealEntityResponse | undefined;
}

const NextEventCard = ({deal}: NextEventInterface) => {
  const {to} = useNavigate();

  const {startAnimation, resetAnimation, xRightAnimation} = useAnimation({});

  const onFocus = useCallback(() => {
    if (deal) startAnimation();

    return () => {
      resetAnimation();
    };
  }, [deal, startAnimation, resetAnimation]);

  useFocusEffect(onFocus);

  return (
    <Fragment>
      {deal && (
        <Section style={{transform: [{translateX: xRightAnimation}]}}>
          <SectionTitle size="md" marginBottom="xs">
            Próximo evento -{' '}
            {capitalizeByIndex(
              format(new Date(deal.proposal.event.date), 'dd MMM'),
              3,
            )}
          </SectionTitle>
          <DescriptionWrapper>
            <View>
              <Text size="sm">{deal.proposal.event.title}</Text>

              <Text size="xs">{deal.proposal.event.address}</Text>
            </View>
            <NextEventActions>
              <SeeEvent
                onPress={() => {
                  to(RootStackScreens.AppStack, {
                    screen: AppStackScreens.EventDetails,
                    params: {
                      event: deal.proposal.event,
                    },
                  });
                }}>
                <Icon icon="arrowRight" />
              </SeeEvent>
            </NextEventActions>
          </DescriptionWrapper>
        </Section>
      )}
    </Fragment>
  );
};

export default NextEventCard;

const Section = styled(Animated.View)`
  ${({theme}) => css`
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing.sm};
    margin: 0 -${theme.spacing.md} ${theme.spacing.md} 0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  `}
`;

const SectionTitle = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.xs};
  `}
`;

const DescriptionWrapper = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${theme.spacing.sm};
  `}
`;

const NextEventActions = styled.View``;

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
