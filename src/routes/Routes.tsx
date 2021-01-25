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
import AuthRoutes from './Auth.routes';

const RootStack = createStackNavigator();

const Routes = () => {
  const {isAuthenticated} = useAuth();

  return (
    <RootStack.Navigator
      initialRouteName={
        isAuthenticated ? RootStackScreens.AuthStack : RootStackScreens.AppStack
      }
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name={RootStackScreens.AppStack}
        component={AppRoutes}
      />
      <RootStack.Screen
        name={RootStackScreens.AuthStack}
        component={AuthRoutes}
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
