import {useFocusEffect} from '@react-navigation/native';
import {orderBy} from 'lodash';
import React, {useCallback, useMemo, useState} from 'react';
import {Animated} from 'react-native';
import styled, {css} from 'styled-components/native';
import ProposalCard from '~/components/Card/ProposalCard';
import Feedback from '~/components/Feedback/Feedback';
import Text from '~/components/Text';
import {LoadingStatus} from '~/config/types';
import {ProposalType} from '~/core/api/api.proposal.types';
import {Proposal, ProposalState} from '~/core/entity/proposal';
import {dealCreateAsyncThunk} from '~/core/store/actions/deal';
import {
  proposalDeleteAsyncThunk,
  updateProposal,
} from '~/core/store/actions/proposal';
import useAnimation from '~/hooks/useAnimation';
import useFeedback from '~/hooks/useFeedback';
import useReduxDispatch from '~/hooks/useReduxDispatch';

interface ProposalsInterface {
  proposals: Proposal[] | undefined;
  type?: ProposalType;
}

const Proposals = ({proposals, type}: ProposalsInterface) => {
  const dispatch = useReduxDispatch();
  const {feedback} = useFeedback();
  const {startAnimation, resetAnimation, xLeftAnimation} = useAnimation({});

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

  const onFocus = useCallback(() => {
    startAnimation();
    return () => {
      resetAnimation();
    };
  }, [startAnimation, resetAnimation]);

  useFocusEffect(onFocus);

  return (
    <ProposalsSection style={{transform: [{translateX: xLeftAnimation}]}}>
      <Text size="sm">
        Últimas propostas {type === 'sent' ? 'enviadas' : 'recebidas'}
      </Text>
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
  );
};

export default Proposals;

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
