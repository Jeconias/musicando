import {useIsDrawerOpen} from '@react-navigation/drawer';
import {addDays, subDays} from 'date-fns';
import {capitalize} from 'lodash';
import {math, rgba} from 'polished';
import React, {Fragment, useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import styled, {css} from 'styled-components/native';
import ProposalCard from '~/components/Card/ProposalCard';
import {SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Loading from '~/components/Loading/Loading';
import Text from '~/components/Text';
import {AuthStackScreens, RootStackScreens} from '~/config/types';
import {proposalListAsyncThunk} from '~/core/store/actions/proposal';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import useNavigate from '~/hooks/useNavigate';
import useReduxSelector from '~/hooks/useReduxSelector';
import {format} from '~/utils/date';

const today = new Date();

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {to, toggleDrawer} = useNavigate();
  const {width, height} = useDeviceDimension();

  const {proposals, loadingProposals} = useReduxSelector((state) => ({
    loadingProposals: state.proposal.list.loading,
    proposals: state.proposal.list.response,
  }));

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

  useEffect(() => {
    (async () => {
      await dispatch(proposalListAsyncThunk({}));
    })();
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{
          icon: 'system',
          backgroundColor: 'backgroundBlackSupport',
          onPress: toggleDrawer,
        }}
        title="Dashboard">
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
        {loadingProposals === 'loading' && <Loading />}
        {loadingProposals == 'ok' && (
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Content>
              <Section>
                <NextEventCard>
                  <SectionTitle size="md" marginBottom="sm">
                    Próximo evento
                  </SectionTitle>
                  <DescriptionWrapper>
                    <View>
                      <Text size="sm" marginBottom="xs">
                        Título do próximo evento
                      </Text>
                      <Text size="xs">Cidade, Estado</Text>
                    </View>
                    <NextEventActions>
                      <SeeEvent>
                        <Icon icon="arrowRight" />
                      </SeeEvent>
                    </NextEventActions>
                  </DescriptionWrapper>
                </NextEventCard>
              </Section>
              <ProposalsSection>
                <Text size="sm">Últimas propostas</Text>
                <ListProposals>
                  {proposals?.length === 0 && (
                    <StyledFeedback
                      title="Nada por aqui 😪"
                      text="No momento, você não possui propostas."
                    />
                  )}
                  {proposals?.map((p) => (
                    <ProposalCard key={p.uuid} proposal={p} />
                  ))}
                </ListProposals>
              </ProposalsSection>
            </Content>
          </PanGestureHandler>
        )}
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
    <Text size="xs">{capitalize(format(date, 'iiiiii'))}</Text>
  </DateText>
);

const HeaderBackground = styled.View<{width: number; height: number}>`
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

const Section = styled.View`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.md};
  `}
`;

const SectionTitle = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.xs};
  `}
`;

const NextEventCard = styled.View`
  ${({theme}) => css`
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing.sm};
    margin-right: -${theme.spacing.md};
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
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

const ProposalsSection = styled.View`
  ${({theme}) => css`
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.backgroundBlackOpacity};
    border-radius: 15px;
    margin-bottom: ${theme.spacing.md};
  `}
`;

const ListProposals = styled.View`
  ${({theme}) => css`
    padding-left: ${theme.spacing.sm};
  `}
`;

const StyledFeedback = styled(Feedback)`
  ${({theme}) => css`
    padding-top: ${theme.spacing.lg};
    padding-bottom: ${theme.spacing.md};
  `}
`;
