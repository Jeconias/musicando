import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import {AppStackScreens} from '~/config/types';
import useNavigate from '~/hooks/useNavigate';
import Summary from './Summary';

const WelcomeArtist = () => {
  const {to} = useNavigate();

  const nextPage = () => to(AppStackScreens.WelcomeNetworking);

  return (
    <SafeAreaView>
      <Container>
        <Artists>
          <Icon icon="artist" />
        </Artists>
        <Summary
          title={'Artistas'}
          description={'Crie seu perfil e conheça outros talentos'}
          current={2}
          nextPage={nextPage}
        />
      </Container>
    </SafeAreaView>
  );
};

export default WelcomeArtist;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.backgroundBlack};
  padding-bottom: ${({theme}) => theme.spacing.lg};
`;

const Artists = styled.View`
  flex: 1;
  justify-content: center;
`;
