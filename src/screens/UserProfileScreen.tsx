import React from 'react';
import {ScrollView} from 'react-native';
import styled, {css} from 'styled-components/native';
import {fonts, SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import LightBoxView from '~/components/LightBoxView';
import Text from '~/components/Text';
import useNavigate from '~/hooks/useNavigate';

const UserProfileScreen = () => {
  const {goBack} = useNavigate();

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft="arrowLeft"
        onPressIconLeft={goBack}
        title="Perfil">
        <ScrollView>
          <UserInfos>
            <WrapperUserPhoto>
              <UserPhoto
                source={require('../assets/imgs/profiles/default.jpg')}
              />
            </WrapperUserPhoto>
            <Infos>
              <Like onPress={() => {}}>
                <Icon icon="heart" size="md" />
              </Like>
              <UserName size="sm" color="primary">
                Ruana Lima
              </UserName>
              <Info>
                <Icon icon="star" size="sm" marginRight="xxs" />
                <Text size="sm" color="text">
                  4.5
                </Text>
              </Info>
              <Info>
                <Icon icon="money" size="sm" marginRight="xxs" />
                <Text size="sm" color="text">
                  R$ 150.00
                </Text>
              </Info>
            </Infos>
          </UserInfos>
          <ContentsWrapper>
            <ContentTitle>Resumo</ContentTitle>
            <DescriptionText size="xs">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s
            </DescriptionText>
          </ContentsWrapper>
          <ContentsWrapper>
            <ContentTitle>Galeria</ContentTitle>
            <GalleryItems>
              <LightBoxView>
                <Image
                  source={{
                    uri:
                      'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg',
                  }}
                />
              </LightBoxView>
              <LightBoxView>
                <Image
                  source={{
                    uri:
                      'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg',
                  }}
                />
              </LightBoxView>
              <LightBoxView>
                <Image
                  source={require('../assets/imgs/profiles/default.jpg')}
                />
              </LightBoxView>
            </GalleryItems>
          </ContentsWrapper>
        </ScrollView>
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
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120%;
  border-radius: 10px;
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
