import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import TabBar from '~/components/Layout/TabBar';
import {AuthStackScreens, RootStackScreens} from '~/config/types';
import useAuth from '~/hooks/useAuth';
import useNavigate from '~/hooks/useNavigate';
import ConfigurationScreen from '~/screens/ConfigurationScreen';
import HomeScreen from '~/screens/HomeScreen';
import OpportunitiesScreen from '~/screens/OpportunitiesScreen';

type BottomTabNavigatorInterface = {
  [key in AuthStackScreens]: any;
};

const AuthStack = createBottomTabNavigator<BottomTabNavigatorInterface>();

const AuthRoutes = () => {
  const {to} = useNavigate();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (!isAuthenticated) to(RootStackScreens.AppStack);
  }, [isAuthenticated]);

  return (
    <AuthStack.Navigator
      initialRouteName={AuthStackScreens.Home}
      backBehavior="initialRoute"
      tabBar={(props) => <TabBar {...props} />}>
      <AuthStack.Screen
        name={AuthStackScreens.Home}
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <AuthStack.Screen
        name={AuthStackScreens.Opportunities}
        component={OpportunitiesScreen}
        options={{tabBarLabel: 'Oportunidades'}}
      />
      <AuthStack.Screen
        name={AuthStackScreens.Configs}
        component={ConfigurationScreen}
        options={{tabBarLabel: 'Mais'}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
