import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import {RootStackScreens} from '~/config/types';
import useAuth from '~/hooks/useAuth';
import RegisterScreen from '~/screens/RegisterScreen';
import TermsScreen from '~/screens/TermsScreen';
import AppRoutes from './App.routes';
import DrawerRoutes from './Drawer.routes';

type StackNavigatorInterface = {
  [key in RootStackScreens]: any;
};

const RootStack = createStackNavigator<StackNavigatorInterface>();

const Routes = () => {
  const {isAuthenticated} = useAuth();

  return (
    <RootStack.Navigator
      initialRouteName={
        isAuthenticated
          ? RootStackScreens.DrawerStack
          : RootStackScreens.AppStack
      }
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name={RootStackScreens.AppStack}
        component={AppRoutes}
      />
      <RootStack.Screen
        name={RootStackScreens.DrawerStack}
        component={DrawerRoutes}
      />
      <RootStack.Screen
        name={RootStackScreens.ModalRegister}
        component={RegisterScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <RootStack.Screen
        name={RootStackScreens.ModalTerms}
        component={TermsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </RootStack.Navigator>
  );
};

export default Routes;
