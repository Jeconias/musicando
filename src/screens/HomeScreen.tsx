import {addDays, subDays} from 'date-fns';
import {capitalize, orderBy} from 'lodash';
import {math, rgba} from 'polished';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Animated, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import ProposalCard from '~/components/Card/ProposalCard';
import {SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import ScrollView from '~/components/Layout/ScrollView';
import Loading from '~/components/Loading/Loading';
import Text from '~/components/Text';
import {AppStackScreens, LoadingStatus, RootStackScreens} from '~/config/types';
import {ProposalState} from '~/core/entity/proposal';
import {
  dealCreateAsyncThunk,
  dealReadAsyncThunk,
} from '~/core/store/actions/deal';
import {
  proposalDeleteAsyncThunk,
  proposalListAsyncThunk,
  updateProposal,
} from '~/core/store/actions/proposal';
import useAnimation from '~/hooks/useAnimation';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import useFeedback from '~/hooks/useFeedback';
import useNavigate from '~/hooks/useNavigate';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';
import {format, isEqualDate} from '~/utils/date';
import {capitalizeByIndex} from '~/utils/string';

const today = new Date();

const HomeScreen = () => {
  const dispatch = useReduxDispatch();
  const {to, toggleDrawer} = useNavigate();
  const {width, height} = useDeviceDimension();
  const {feedback} = useFeedback();
  const {xLeftAnimation, xRightAnimation} = useAnimation({});

  const {proposals, loadingProposals, loadingDeals, deals} = useReduxSelector(
    (state) => ({
      deals: state.deal.read.response?.data.deals,
      loadingDeals: state.deal.read.loading,
      proposals: state.proposal.list.response,
      loadingProposals: state.proposal.list.loading,
    }),
  );

  const [
    loadingHandleProposal,
    setLoadingHandleProposal,
  ] = useState<LoadingStatus>('idle');

  const handleAcceptedProposal = useCallback(
    async (uuid: string) => {
      setLoadingHandleProposal('loading');
      const resp = await dispatch(dealCreateAsyncThunk({uuidProposal: uuid}));
      if (dealCreateAsyncThunk.fulfilled.match(resp)) {
        dispatch(
          updateProposal({uuid, proposal: {state: ProposalState.ACCEPT}}),
        );
        feedback({
          type: 'success',
          message: 'Proposta aceita.',
        });
      }
      setLoadingHandleProposal('ok');
    },
    [dispatch, feedback, setLoadingHandleProposal],
  );

  const handleRejectedProposal = useCallback(
    async (uuid: string) => {
      setLoadingHandleProposal('loading');
      const resp = await dispatch(proposalDeleteAsyncThunk({uuid}));
      if (proposalDeleteAsyncThunk.fulfilled.match(resp)) {
        dispatch(
          updateProposal({uuid, proposal: {state: ProposalState.REJECT}}),
        );
        feedback({
          type: 'success',
          message: 'Proposta rejeitada.',
        });
      }
      setLoadingHandleProposal('ok');
    },
    [dispatch, feedback, setLoadingHandleProposal],
  );

  const proposalsMemorized = useMemo(
    () => orderBy(proposals, ['created'], 'desc'),
    [proposals],
  );

  const dealMemorized = useMemo(
    () =>
      orderBy(deals, (d) => d?.proposal?.event?.date, 'desc')[
        (deals?.length || 1) - 1
      ],
    [deals],
  );

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(proposalListAsyncThunk({})),
        dispatch(dealReadAsyncThunk({})),
      ]);
    })();
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainerWithHeader
          iconLeft={{
            icon: 'system',
            backgroundColor: 'backgroundBlackSupport',
            onPress: toggleDrawer,
          }}
          title="Dashboard">
          <HeaderBackground width={width} height={height}>
            {new Array(5).fill(null).map((_, k) => {
              const eventDate = dealMemorized?.proposal?.event?.date
                ? new Date(dealMemorized.proposal.event.date || '')
                : undefined;
              const calc = 2 - k;
              if (k !== 2) {
                const date =
                  calc > 0
                    ? subDays(today, calc)
                    : addDays(today, Math.abs(calc));

                const withDot = isEqualDate(date, eventDate);
                return <Day key={k} date={date} withDot={withDot} />;
              } else {
                const withDot = isEqualDate(today, eventDate);
                return (
                  <Day key={k} date={today} withBackground withDot={withDot} />
                );
              }
            })}
          </HeaderBackground>

          {loadingProposals === 'loading' || loadingDeals === 'loading' ? (
            <Loading />
          ) : loadingProposals === 'error' || loadingDeals === 'error' ? (
            <Feedback
              title="Ops! tivemos um erro inesperado. 😱"
              text="Por favor, verifique a conexão com a sua internet e tente novamente."
            />
          ) : null}
          {loadingProposals === 'ok' && loadingDeals === 'ok' && (
            <Content>
              {dealMemorized && (
                <Section style={{transform: [{translateX: xRightAnimation}]}}>
                  <NextEventCard>
                    <SectionTitle size="md" marginBottom="xs">
                      Próximo evento -{' '}
                      {capitalizeByIndex(
                        format(
                          new Date(dealMemorized.proposal.event.date),
                          'dd MMM',
                        ),
                        3,
                      )}
                    </SectionTitle>
                    <DescriptionWrapper>
                      <View>
                        <Text size="sm">
                          {dealMemorized.proposal.event.title}
                        </Text>

                        <Text size="xs">
                          {dealMemorized.proposal.event.address}
                        </Text>
                      </View>
                      <NextEventActions>
                        <SeeEvent
                          onPress={() => {
                            to(RootStackScreens.AppStack, {
                              screen: AppStackScreens.EventDetails,
                              params: {
                                event: dealMemorized.proposal.event,
                              },
                            });
                          }}>
                          <Icon icon="arrowRight" />
                        </SeeEvent>
                      </NextEventActions>
                    </DescriptionWrapper>
                  </NextEventCard>
                </Section>
              )}
              <ProposalsSection
                style={{transform: [{translateX: xLeftAnimation}]}}>
                <Text size="sm">Últimas propostas</Text>
                <ListProposals>
                  {proposalsMemorized?.length === 0 && (
                    <StyledFeedback
                      title="Nada por aqui 😪"
                      text="No momento, você não possui propostas."
                    />
                  )}
                  {proposalsMemorized?.map((p) => (
                    <ProposalCard
                      key={p.uuid}
                      proposal={p}
                      onAccepted={handleAcceptedProposal}
                      onRejected={handleRejectedProposal}
                      disabledActions={loadingHandleProposal === 'loading'}
                    />
                  ))}
                </ListProposals>
              </ProposalsSection>
            </Content>
          )}
        </ContainerWithHeader>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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

const Content = styled.View`
  flex: 1;
`;

const Section = styled(Animated.View)`
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

const ProposalsSection = styled(Animated.View)`
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
