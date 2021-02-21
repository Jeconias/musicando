import React from 'react';
import {Text, View} from 'react-native';
import styled, {css} from 'styled-components';
import ButtonCircled from '~/components/Button/ButtonCircled';
import Dots, {CurrentDot} from './Dots';

interface SummaryInterface {
  title: string;
  description: string;
  current?: CurrentDot;
  nextPage(): void;
}

const Summary = ({title, description, current, nextPage}: SummaryInterface) => (
  <WrapperSummary>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Dots current={current} />
    <ButtonCircled onPress={nextPage} />
  </WrapperSummary>
);

export default Summary;

const WrapperSummary = styled(View)`
  align-items: center;
`;

const Title = styled(Text)`
  ${({theme}) => css`
    color: ${theme.colors.title};
    font-size: ${theme.fontSize.lg};
    margin-bottom: ${theme.spacing.xxs};
  `}
`;

const Description = styled(Text)`
  ${({theme}) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fontSize.sm};
    text-align: center;
    max-width: 300px;
  `}
`;
