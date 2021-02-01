import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import SideBar from '~/components/Layout/SideBar';
import {DrawerStackScreens} from '~/config/types';
import useTheme from '~/hooks/useTheme';
import AuthRoutes from './Auth.routes';
import EventRoutes from './Event.routes';

type DrawerNavigatorInterface = {
  [key in DrawerStackScreens]: any;
};

const DrawerStack = createDrawerNavigator<DrawerNavigatorInterface>();

const DrawerRoutes = () => {
  const {theme} = useTheme();

  return (
    <DrawerStack.Navigator
      initialRouteName={DrawerStackScreens.Home}
      drawerStyle={{backgroundColor: theme.colors.backgroundBlackSupport}}
      drawerContent={(props) => <SideBar {...props} />}>
      <DrawerStack.Screen
        name={DrawerStackScreens.Home}
        component={AuthRoutes}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <DrawerStack.Screen
        name={DrawerStackScreens.Event}
        component={EventRoutes}
        options={{
          drawerLabel: 'Eventos',
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DrawerRoutes;
