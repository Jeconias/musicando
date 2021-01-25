import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from '~/routes/Routes';
import {ThemeProvider} from 'styled-components';
import {THEME} from '~/config/constants';
import AuthProvider from '~/providers/AuthProvider';
import LoadProvider from '~/providers/LoadProvider';

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <AuthProvider>
        <LoadProvider>
          <StatusBar
            backgroundColor={THEME.colors.backgroundBlack}
            barStyle="light-content"
          />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </LoadProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
