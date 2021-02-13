import React from 'react';
import styled, {css} from 'styled-components/native';
import {ENVIRONMENT} from '~/config/constants';
import Text from './Text';

const Environment = () => {
  if (ENVIRONMENT.isProd) return null;
  return (
    <Container>
      <Text size="xs" color="white">
        {ENVIRONMENT.isDev ? 'DEV' : ENVIRONMENT.isHom ? 'HOM' : ''}
      </Text>
    </Container>
  );
};

export default Environment;

const Container = styled.View`
  ${({theme}) => css`
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 20px;
    background-color: ${theme.colors.feedbackError};
    top: 5px;
    right: -25px;
    transform: rotate(45deg);
    z-index: 100;
  `}
`;
