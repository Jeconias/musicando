import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {ScrollView, Image} from 'react-native';
import styled, {css} from 'styled-components/native';
import {fonts, SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Loading from '~/components/Loading/Loading';
import Text from '~/components/Text';
import {LoadingStatus, RouteParams} from '~/config/types';
import {Event} from '~/core/entity/event';
import useFirebase from '~/hooks/useFirebase';
import useNavigate from '~/hooks/useNavigate';

interface EventDetailsScreenInterface extends RouteParams<{event: Event}> {}

const EventDetailsScreen = ({route: {params}}: EventDetailsScreenInterface) => {
  const {goBack} = useNavigate();
  const {
    event: {getCover},
  } = useFirebase();

  const event = params?.event;
  const hasEvent = !isEmpty(event);

  const [eventCover, setEventCover] = useState<string | undefined>();
  const [loading, setLoading] = useState<LoadingStatus>('idle');

  useEffect(() => {
    if (!event?.uuid || eventCover === '' || eventCover) return;
    setLoading('loading');

    (async () => {
      const cover = await getCover(event?.uuid);
      setEventCover(cover ?? '');
      setLoading('ok');
    })();
  }, [getCover, event]);

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{icon: 'arrowLeft', onPress: goBack}}
        title="Detalhes">
        {!hasEvent && (
          <Feedback
            title="Ops! Não conseguimos localizar esse usuário. 😱"
            text="Por favor, verifique a conexão com a sua internet."
          />
        )}
        {loading === 'loading' && <Loading />}
        {hasEvent && loading === 'ok' && (
          <ScrollView>
            <UserInfos>
              <WrapperUserPhoto>
                <ImageContainer>
                  {event?.cover || eventCover ? (
                    <Image source={{uri: event?.cover ?? eventCover}} />
                  ) : (
                    <Icon icon="event" size="xl" color="text" />
                  )}
                </ImageContainer>
              </WrapperUserPhoto>
              <Infos>
                <Like onPress={() => {}}>
                  <Icon icon="heart" size="md" />
                </Like>
                <UserName size="sm" color="primary">
                  {event?.title ?? ''}
                </UserName>
                <Info>
                  <Icon icon="star" size="sm" color="text" marginRight="xxs" />
                  <Text size="sm" color="white">
                    4.5
                  </Text>
                </Info>
                {(event?.valueRef || event?.value_ref) && (
                  <Info>
                    <Icon
                      icon="money"
                      size="sm"
                      color="text"
                      marginRight="xxs"
                    />

                    <Text size="sm" color="white">
                      R${' '}
                      {(event?.valueRef ?? event?.value_ref ?? '').toString()}
                    </Text>
                  </Info>
                )}
              </Infos>
            </UserInfos>
            <ContentsWrapper>
              <ContentTitle>Resumo</ContentTitle>
              <DescriptionText size="xs">
                {event?.description ?? ''}
              </DescriptionText>
            </ContentsWrapper>
          </ScrollView>
        )}
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;

const UserInfos = styled.View`
  ${({theme}) => css`
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 126px;
    border-radius: 10px;
    background-color: ${theme.colors.backgroundBlackOpacity};
    margin: ${theme.spacing.xlg} 0 ${theme.spacing.md};
  `}
`;

const WrapperUserPhoto = styled.View`
  height: 100%;
  width: 136px;
`;

const ImageContainer = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120%;
    border-radius: 10px;
    background-color: ${theme.colors.backgroundBlackSupport};
  `}
`;

const Infos = styled.View`
  ${({theme}) => css`
    flex: 1;
    padding: ${theme.spacing.sm};
  `}
`;

const UserName = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.sm};
  `}
`;

const Info = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${theme.spacing.xxs};
  `}
`;

const Like = styled.TouchableOpacity`
  ${({theme}) => css`
    position: absolute;
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    z-index: 1;
  `}
`;

const ContentsWrapper = styled.View`
  ${({theme}) => css`
    width: 100%;
    border-radius: 10px;
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.backgroundBlackOpacity};
    margin-bottom: ${theme.spacing.md};
  `}
`;

const ContentTitle = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.sm};
  `}
`;

const DescriptionText = styled(Text)`
  ${fonts.RubikLight};
`;

/* const Image = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 5px;
  margin: 0 ${({theme}) => theme.spacing.xxs};
`;

const GalleryItems = styled.View`
  flex-direction: row;
  margin: 0 -${({theme}) => theme.spacing.xxs};
`; */
