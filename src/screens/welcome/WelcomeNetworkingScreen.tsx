import React from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components';
import {SafeAreaView} from '~/components/common';
import {AppStackScreens} from '~/config/types';
import useLoad from '~/hooks/useLoad';
import useNavigate from '~/hooks/useNavigate';
import Summary from './Summary';

const WelcomeNetworkingScreen = () => {
  const {navigation} = useNavigate();
  const {handleWithFirstAccess} = useLoad();

  const nextPage = () => {
    handleWithFirstAccess();
    navigation.reset({
      index: 0,
      routes: [{name: AppStackScreens.Login}],
    });
  };

  return (
    <SafeAreaView>
      <Container>
        <Background
          source={require('../../assets/imgs/backgrounds/networking.png')}
          style={{resizeMode: 'cover'}}
        />
        <Summary
          title="Artistas"
          description="Aumente sua networking mostrando o seu talento"
          current={3}
          nextPage={nextPage}
        />
      </Container>
    </SafeAreaView>
  );
};

export default WelcomeNetworkingScreen;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.backgroundBlack};
  padding-bottom: ${({theme}) => theme.spacing.lg};
`;

const Background = styled(Image)`
  flex: 1;
  width: 100%;
  min-height: 445px;
`;
