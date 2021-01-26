import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from '~/routes/Routes';
import {ThemeProvider} from 'styled-components';
import AuthProvider from '~/providers/AuthProvider';
import LoadProvider from '~/providers/LoadProvider';
import FeedbackBar from '~/components/FeedbackBar';
import FeedbackProvider from '~/providers/FeedbackProvider';
import useTheme from '~/hooks/useTheme';
import Environment from '~/components/Environment';

const App = () => {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LoadProvider>
          <FeedbackProvider>
            <StatusBar
              backgroundColor={theme.colors.statusBar}
              barStyle="light-content"
            />
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </FeedbackProvider>
        </LoadProvider>
      </AuthProvider>
      <Environment />
      <FeedbackBar />
    </ThemeProvider>
  );
};

export default App;
