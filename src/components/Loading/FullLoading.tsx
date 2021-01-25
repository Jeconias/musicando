import React from 'react';
import {SafeAreaView} from '../common';
import Container from '../Layout/Container';
import Loading from './Loading';

const FullLoading = () => (
  <SafeAreaView>
    <Container justifyContent="center">
      <Loading size="large" />
    </Container>
  </SafeAreaView>
);

export default FullLoading;
