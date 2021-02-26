import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React, {useCallback, useMemo} from 'react';
import styled, {css} from 'styled-components/native';
import {DrawerStackScreens} from '~/config/types';
import {UserType} from '~/core/entity/common';
import useAuth from '~/hooks/useAuth';
import useNavigate from '~/hooks/useNavigate';
import Icon, {IconType} from '../Icon';
import Img from '../Img';
import Text from '../Text';

const today = new Date();

interface SideBarInterface
  extends DrawerContentComponentProps<DrawerContentOptions> {}

const SideBar = ({state, descriptors}: SideBarInterface) => {
  const {user} = useAuth();
  const {to} = useNavigate();

  const getIcon = useCallback((routeName: DrawerStackScreens):
    | IconType
    | undefined => {
    if (routeName === DrawerStackScreens.Home) return 'system';
    if (routeName === DrawerStackScreens.Event) return 'glassCup';
  }, []);

  const {routes, index: currentScreen} = state;

  const routesMemorized = useMemo(() => {
    const notShow =
      user?.userType === UserType.MUSICIAN ? [DrawerStackScreens.Event] : [];
    return routes.filter(
      (r) => !notShow.includes(r.name as DrawerStackScreens),
    );
  }, [routes, user]);

  return (
    <Wrapper>
      <Header>
        <Img
          source={
            user?.photo
              ? {
                  uri: user?.photo,
                }
              : require('../../assets/imgs/profiles/default.jpg')
          }
        />
        <UserName size="sm">{user?.name ?? ''}</UserName>
      </Header>
      <Content>
        <Group>
          {routesMemorized.map((route, index) => {
            const routeName = route.name as DrawerStackScreens;
            const isFocused = currentScreen === index;
            const focusedOptions = descriptors[route.key]
              .options as DrawerNavigationOptions;
            const icon = getIcon(routeName);

            return (
              <MainItem
                key={routeName}
                onPress={() => to(routeName)}
                isFocused={isFocused}>
                <IconWrapper>
                  {icon && <Icon icon={icon} size="sm" />}
                  <ItemName size="sm">
                    {focusedOptions?.drawerLabel?.toString() ?? ''}
                  </ItemName>
                </IconWrapper>
                {routeName !== DrawerStackScreens.Home && (
                  <Icon icon="right" size="xs" />
                )}
              </MainItem>
            );
          })}
        </Group>
        <Footer>
          <Text size="xxs">
            &copy; Copyright {today.getFullYear().toString()} - Musicando
          </Text>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.View`
  ${({theme}) => css`
    flex: 1;
    background-color: ${theme.colors.backgroundBlackOpacity};
  `}
`;

const Header = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${Math.ceil((25 / 100) * theme.device.dimensions.window.height)}px;
    background-color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
  `}
`;

const Content = styled.View`
  ${({theme}) => css`
    flex: 1;
    justify-content: space-between;
    padding: 0 ${theme.spacing.md} ${theme.spacing.md};
  `}
`;

const UserName = styled(Text)`
  ${({theme}) => css`
    margin-top: ${theme.spacing.sm};
  `}
`;

const Group = styled.View``;

const MainItem = styled.TouchableOpacity<{isFocused?: boolean}>`
  ${({theme, isFocused}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.fontSize.xs} 0;
    border-bottom-width: 0.5px;
    border-color: ${theme.colors.backgroundBlackSupport};
    margin-bottom: ${theme.spacing.xs};

    ${isFocused &&
    css`
      border-color: ${theme.colors.white};
    `}
  `}
`;

const ItemName = styled(Text)`
  ${({theme}) => css`
    margin-left: ${theme.spacing.sm};
  `}
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Footer = styled.View`
  align-items: center;
`;
