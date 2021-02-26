import {isEmpty} from 'lodash';
import React from 'react';
import {ScrollView} from 'react-native';
import styled, {css} from 'styled-components/native';
import {fonts, SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Text from '~/components/Text';
import {RouteParams} from '~/config/types';
import {User} from '~/core/entity/user';
import useNavigate from '~/hooks/useNavigate';

interface UserProfileScreenInterface extends RouteParams<{user: User}> {}

const UserProfileScreen = ({route: {params}}: UserProfileScreenInterface) => {
  const {goBack} = useNavigate();

  const user = params?.user;
  const hasUser = !isEmpty(user);

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{icon: 'left', onPress: goBack}}
        title="Perfil">
        {!hasUser && (
          <Feedback
            title="Ops! Não conseguimos localizar esse usuário. 😱"
            text="Por favor, verifique a conexão com a sua internet."
          />
        )}
        {hasUser && (
          <ScrollView>
            <UserInfos>
              <WrapperUserPhoto>
                <UserPhoto source={{uri: user?.photo}} />
              </WrapperUserPhoto>
              <Infos>
                <Like onPress={() => {}}>
                  <Icon icon="heart" size="md" />
                </Like>
                <UserName size="sm" color="primary">
                  {user?.name ?? ''}
                </UserName>
                <Info>
                  <Icon icon="star" size="sm" color="text" marginRight="xxs" />
                  <Text size="sm" color="white">
                    4.5
                  </Text>
                </Info>
                <Info>
                  <Icon icon="money" size="sm" color="text" marginRight="xxs" />
                  <Text size="sm" color="white">
                    R$ 150.00
                  </Text>
                </Info>
              </Infos>
            </UserInfos>
            <ContentsWrapper>
              <ContentTitle>Resumo</ContentTitle>
              <DescriptionText size="xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s. Lorem Ipsum is simply dummy text of
                the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s
              </DescriptionText>
            </ContentsWrapper>
            {/* <ContentsWrapper>
              <ContentTitle>Galeria</ContentTitle>
              <GalleryItems>
                <LightBoxView>
                  <Image
                    source={require('../assets/imgs/profiles/default.jpg')}
                  />
                </LightBoxView>
              </GalleryItems>
            </ContentsWrapper> */}
          </ScrollView>
        )}
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

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
const UserPhoto = styled.Image`
  ${({theme}) => css`
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

const Image = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 5px;
  margin: 0 ${({theme}) => theme.spacing.xxs};
`;

const GalleryItems = styled.View`
  flex-direction: row;
  margin: 0 -${({theme}) => theme.spacing.xxs};
`;
