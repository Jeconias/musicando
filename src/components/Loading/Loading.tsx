import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import styled from 'styled-components/native';

const Loading = ({...props}: ActivityIndicatorProps) => (
  <Container>
    <ActivityIndicator size="large" color="#fff" {...props} />
  </Container>
);

export default Loading;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
