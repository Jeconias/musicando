import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {EventStackScreens} from '~/config/types';
import EventCreateScreen from '~/screens/EventCreateScreen';
import EventListScreen from '~/screens/EventListScreen';

type EventStackNavigatorInterface = {
  [key in EventStackScreens]: any;
};

const RootStack = createStackNavigator<EventStackNavigatorInterface>();

const EventRoutes = () => {
  return (
    <RootStack.Navigator
      initialRouteName={EventStackScreens.List}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <RootStack.Screen
        name={EventStackScreens.List}
        component={EventListScreen}
      />
      <RootStack.Screen
        name={EventStackScreens.Create}
        component={EventCreateScreen}
      />
    </RootStack.Navigator>
  );
};

export default EventRoutes;
