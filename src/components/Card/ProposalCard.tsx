import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, Easing, LayoutChangeEvent} from 'react-native';
import styled, {css} from 'styled-components/native';
import {Proposal, ProposalState} from '~/core/entity/proposal';
import Icon from '../Icon';
import Text from '../Text';

interface ProposalCardInterface {
  proposal: Proposal;
}

const ProposalCard = ({proposal}: ProposalCardInterface) => {
  const animatedDescription = useRef(new Animated.Value(0)).current;
  const animatedActions = useRef(new Animated.Value(0)).current;

  const [descriptionIsVisible, setDescriptionIsVisible] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const handleDescriptionHeight = useCallback(
    (e: LayoutChangeEvent) => {
      if (!descriptionHeight || descriptionHeight < e.nativeEvent.layout.height)
        setDescriptionHeight(e.nativeEvent.layout.height + 16);
    },
    [descriptionHeight],
  );

  const animatedDescriptionMemorized = useMemo(
    () =>
      animatedDescription.interpolate({
        inputRange: [0, 1],
        outputRange: [0, descriptionHeight],
      }),
    [descriptionHeight, animatedDescription],
  );

  const animatedActionsMemorized = useMemo(
    () =>
      animatedActions.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
      }),
    [animatedActions],
  );

  const handleDescriptionShow = useCallback(() => {
    console.log('aaa');
    if (descriptionIsVisible) {
      Animated.sequence([
        Animated.timing(animatedActions, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.back(2),
        }),
        Animated.timing(animatedDescription, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ]).start(() => setDescriptionIsVisible(false));
    } else {
      Animated.sequence([
        Animated.timing(animatedDescription, {
          toValue: 1,
          duration: 700,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(animatedActions, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start(() => setDescriptionIsVisible(true));
    }
  }, [
    animatedDescription,
    animatedActions,
    descriptionIsVisible,
    setDescriptionIsVisible,
  ]);

  return (
    <Container>
      <ActionButton onPress={handleDescriptionShow}>
        <TitleWrapper>
          <Dot proposalState={proposal.state} />
          <Text size="sm">{proposal.event.title}</Text>
        </TitleWrapper>
        <Text size="xs" color="primary">
          R$ {proposal.value}
        </Text>
      </ActionButton>
      <DescrptionWrapper
        style={{
          height: animatedDescriptionMemorized,
        }}>
        <Description onLayout={handleDescriptionHeight}>
          <Text size="xs" marginBottom="sm">
            {proposal.description}
          </Text>
          <Text size="xs">{proposal.from.name}.</Text>
          <Actions
            style={{
              transform: [
                {
                  translateX: animatedActionsMemorized,
                },
              ],
            }}>
            <Action>
              <Icon icon="checkSmall" size="sm" color="feedbackSuccess" />
            </Action>
            <Action>
              <Icon icon="closeSmall" size="sm" color="feedbackError" />
            </Action>
          </Actions>
        </Description>
      </DescrptionWrapper>
    </Container>
  );
};

export default ProposalCard;

const Container = styled.View`
  ${({theme}) => css`
    padding: ${theme.spacing.sm} 0 0;
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.backgroundBlackSupport};
  `}
`;

const ActionButton = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.xs};
  `}
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dot = styled.View<{proposalState: ProposalState}>`
  ${({theme, proposalState}) => css`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: ${theme.spacing.sm};
    background-color: ${theme.colors.backgroundBlackSupport};

    ${proposalState === ProposalState.ACCEPT &&
    css`
      background-color: ${theme.colors.feedbackSuccess};
    `}

    ${proposalState === ProposalState.REJECT &&
    css`
      background-color: ${theme.colors.feedbackError};
    `}
  `}
`;

const DescrptionWrapper = styled(Animated.View)`
  overflow: hidden;
`;

const Description = styled.View``;

const Actions = styled(Animated.View)`
  ${({theme}) => css`
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    margin: 0 -${theme.spacing.xs};
    padding: ${theme.spacing.xs} 0;
  `}
`;

const Action = styled.TouchableOpacity`
  ${({theme}) => css`
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xxs};
    background-color: ${theme.colors.backgroundBlackSupport};
    margin: 0 ${theme.spacing.xs};
    border-radius: 5px;
  `}
`;
