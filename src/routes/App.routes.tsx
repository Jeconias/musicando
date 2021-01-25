import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import useLoad from '~/hooks/useLoad';
import LoginScreen from '~/screens/LoginScreen';
import WelcomeLocationScreen from '~/screens/welcome/WelcomeLocationScreen';
import WelcomeArtist from '~/screens/welcome/WelcomeArtist';
import WelcomeNetworkingScreen from '~/screens/welcome/WelcomeNetworkingScreen';
import OpportunitiesScreen from '~/screens/OpportunitiesScreen';
import UserProfileScreen from '~/screens/UserProfileScreen';
import {AppStackScreens} from '~/config/types';

const AppStack = createStackNavigator();

const AppRoutes = () => {
  const {isFirstAccess} = useLoad();

  return (
    <AppStack.Navigator
      initialRouteName={
        isFirstAccess ? AppStackScreens.WelcomeLocation : AppStackScreens.Login
      }
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AppStack.Screen
        name={AppStackScreens.WelcomeLocation}
        component={WelcomeLocationScreen}
      />
      <AppStack.Screen
        name={AppStackScreens.WelcomeArtist}
        component={WelcomeArtist}
      />
      <AppStack.Screen
        name={AppStackScreens.WelcomeNetworking}
        component={WelcomeNetworkingScreen}
      />
      <AppStack.Screen name={AppStackScreens.Login} component={LoginScreen} />
      <AppStack.Screen
        name={AppStackScreens.Opportunities}
        component={OpportunitiesScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      />
      <AppStack.Screen
        name={AppStackScreens.UserProfile}
        component={UserProfileScreen}
      />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
