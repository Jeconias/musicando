import React from 'react';
import {View} from 'react-native';
import styled, {css} from 'styled-components';

export type CurrentDot = number;

interface DotsInterface {
  total?: number;
  current?: CurrentDot;
}

const Dots = ({current, total = 3, ...props}: DotsInterface) => (
  <WrapperDots {...props}>
    {new Array(total).fill(null).map((_, i) => (
      <Dot key={i} isCurrent={(!current && i === 0) || current === i + 1} />
    ))}
  </WrapperDots>
);

export default Dots;

const WrapperDots = styled(View)`
  ${({theme}) => css`
    margin: ${theme.spacing.md} 0 ${theme.spacing.lg};
    flex-direction: row;
  `}
`;

const Dot = styled(View)<{isCurrent?: boolean}>`
  ${({theme, isCurrent}) => css`
    width: 8px;
    height: 8px;
    border: 1px solid ${theme.colors.white};
    border-radius: 4px;
    margin: 0 ${theme.spacing.xxs};
    background-color: ${isCurrent ? theme.colors.white : 'transparent'};
  `}
`;
