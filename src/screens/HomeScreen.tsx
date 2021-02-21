import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import ScrollView from '~/components/Layout/ScrollView';
import Loading from '~/components/Loading/Loading';
import {ProposalType} from '~/core/api/api.proposal.types';
import {UserType} from '~/core/entity/common';
import {dealReadAsyncThunk} from '~/core/store/actions/deal';
import {proposalListAsyncThunk} from '~/core/store/actions/proposal';
import useAuth from '~/hooks/useAuth';
import useNavigate from '~/hooks/useNavigate';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';
import NextEvents from './Home/NextEvents';
import Proposals from './Home/Proposals';

const HomeScreen = () => {
  const dispatch = useReduxDispatch();
  const {toggleDrawer} = useNavigate();
  const {user} = useAuth();

  const opacityAnimate = useRef(new Animated.Value(0)).current;

  const opacity = opacityAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const {proposals, loadingProposals, loadingDeals, deals} = useReduxSelector(
    (state) => ({
      deals: state.deal.read.response?.data.deals,
      loadingDeals: state.deal.read.loading,
      proposals: state.proposal.list.response,
      loadingProposals: state.proposal.list.loading,
    }),
  );

  const onFocus = useCallback(() => {
    Animated.timing(opacityAnimate, {
      toValue: 1,
      useNativeDriver: true,
      delay: 500,
      easing: Easing.linear,
    }).start();

    return () => {
      opacityAnimate.setValue(0);
    };
  }, [opacityAnimate]);

  const proposalType: ProposalType =
    user?.userType === UserType.MUSICIAN ? 'sent' : 'received';

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(proposalListAsyncThunk({type: proposalType})),
        dispatch(dealReadAsyncThunk({})),
      ]);
    })();
  }, [dispatch, proposalType]);

  useFocusEffect(onFocus);

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainerWithHeader
          iconLeft={{
            icon: 'system',
            backgroundColor: 'backgroundBlackSupport',
            onPress: toggleDrawer,
          }}
          title="Dashboard"
          opacity={opacity}>
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
              <NextEvents deals={deals} />
              <Proposals type={proposalType} proposals={proposals} />
            </Content>
          )}
        </ContainerWithHeader>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const Content = styled.View`
  flex: 1;
`;
