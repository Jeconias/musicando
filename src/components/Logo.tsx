import {math, rgba} from 'polished';
import React from 'react';
import styled, {css} from 'styled-components/native';
import Icon from './Icon';

const Logo = () => (
  <Container>
    <Icon icon="sound" size="lg" />
  </Container>
);

export default Logo;

const Container = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 75px;
    background-color: ${rgba(theme.colors.white, 0.025)};
    border-radius: 6px;
    margin: 0 auto;
    margin-bottom: ${math(`${theme.spacing.lg} + ${theme.spacing.md}`)};
  `}
`;
