import React from 'react';
import styled from 'styled-components/native';
import {ENVIRONMENT} from '~/config/constants';
import Text from './Text';

const Environment = () => {
  if (ENVIRONMENT.isProd) return null;
  return (
    <Container>
      <Text size="xs" color="feedbackError">
        {ENVIRONMENT.isDev ? 'DEV' : ENVIRONMENT.isHom ? 'HOM' : ''}
      </Text>
    </Container>
  );
};

export default Environment;

const Container = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
`;
