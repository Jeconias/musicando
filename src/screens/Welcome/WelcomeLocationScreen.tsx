import React from 'react';
import {View} from 'react-native';
import styled, {css} from 'styled-components';
import {SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import {AppStackScreens} from '~/config/types';
import useDeviceDimension from '~/hooks/useDeviceDimension';
import useNavigate from '~/hooks/useNavigate';
import Summary from './Summary';

const WelcomeLocationScreen = () => {
  const {to} = useNavigate();
  const {width, height} = useDeviceDimension();

  const nextPage = () => to(AppStackScreens.WelcomeArtist);

  return (
    <SafeAreaView>
      <Container>
        <Map icon="map" width={width} />
        <LocationAnother icon="location" widthX={width} heightX={height} />
        <Summary
          title={'Eventos'}
          description={'Localize eventos em todo o Brasil'}
          nextPage={nextPage}
        />
      </Container>
    </SafeAreaView>
  );
};

export default WelcomeLocationScreen;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.backgroundBlack};
  padding-bottom: ${({theme}) => theme.spacing.lg};
`;

const Map = styled(Icon)<{width: number}>`
  width: ${({width}) => Math.ceil(width)}px;
  margin-bottom: ${({theme}) => theme.spacing.md};
`;

/* const LocationRN = styled(Icon)<{widthX: number; heightX: number}>`
  ${({widthX, heightX}) => css`
    position: absolute;
    top: ${Math.ceil((widthX - 35) / 2)}px;
    right: ${Math.ceil((heightX - 115) / 3)}px;
  `};
`; */

const LocationAnother = styled(Icon)<{widthX: number; heightX: number}>`
  ${({widthX, heightX}) => css`
    position: absolute;
    top: ${Math.ceil(widthX / 1.8)}px;
    right: ${Math.ceil(heightX / 3.2)}px;
  `};
`;
