import {math} from 'polished';
import React from 'react';
import styled, {css} from 'styled-components/native';
import ButtonText from '~/components/Button/ButtonText';
import {SafeAreaView} from '~/components/common';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Text from '~/components/Text';
import useAuth from '~/hooks/useAuth';

const ConfigurationScreen = () => {
  const {user, logout} = useAuth();

  return (
    <SafeAreaView>
      <ContainerWithHeader title="Configurações">
        <BackgroundHeader
          source={require('../assets/imgs/backgrounds/config.jpg')}
        />
        <Wrapper>
          <Content>
            <UserPhoto
              source={
                user?.photo
                  ? {
                      uri: user?.photo,
                    }
                  : require('../assets/imgs/profiles/default.jpg')
              }
            />
            <Info>
              <UserName size="md">{user?.name ?? ''}</UserName>
              <List>
                <Option>
                  <Left>
                    <Icon icon="world" size="sm" marginRight="sm" />
                    <Text size="sm">Idioma</Text>
                  </Left>
                  <Right>
                    <Icon icon="arrowRight" size="sm" />
                  </Right>
                </Option>
              </List>
            </Info>
          </Content>
          <Logout size="xs" color="feedbackError" onPress={logout}>
            Encerrar Sessão
          </Logout>
        </Wrapper>
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default ConfigurationScreen;

const BackgroundHeader = styled.Image`
  ${({theme}) => css`
    position: absolute;
    margin: -${theme.spacing.md};
    margin-bottom: 0;
    width: ${theme.device.dimensions.window.width}px;
    height: ${Math.ceil((35 / 100) * theme.device.dimensions.window.height)}px;
    z-index: -1;
  `}
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Content = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    position: relative;
    justify-content: center;
    background-color: ${theme.colors.backgroundBlackOpacity};
    padding: ${theme.spacing.md};
    margin-top: ${math(`${theme.spacing.xlg} * 2`)};
    border-radius: 10px;
  `}
`;

const UserPhoto = styled.Image`
  ${({theme}) => css`
    position: absolute;
    top: -${theme.spacing.xlg};
    width: 90px;
    height: 90px;
    border-radius: 45px;
  `}
`;

const UserName = styled(Text)`
  ${({theme}) => css`
    text-align: center;
    margin-bottom: ${theme.spacing.lg};
  `}
`;

const Info = styled.View`
  ${({theme}) => css`
    flex: 1;
    padding-top: ${theme.spacing.xlg};
  `}
`;

const List = styled.View`
  ${({theme}) => css``}
`;

const Option = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-color: ${theme.colors.backgroundBlackSupport};
    padding-bottom: ${theme.spacing.xs};
  `}
`;

const Left = styled.View`
  flex-direction: row;
`;

const Right = styled.View``;

const Logout = styled(ButtonText)`
  ${({theme}) => css`
    margin: auto auto ${theme.spacing.md};
    padding: ${theme.spacing.xs};
  `}
`;
