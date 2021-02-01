import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from '~/routes/Routes';
import {ThemeProvider} from 'styled-components';
import AuthProvider from '~/providers/AuthProvider';
import LoadProvider from '~/providers/LoadProvider';
import {Provider} from 'react-redux';
import FeedbackBar from '~/components/FeedbackBar';
import FeedbackProvider from '~/providers/FeedbackProvider';
import useTheme from '~/hooks/useTheme';
import Environment from '~/components/Environment';
import store from '~/core/store';

const App = () => {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
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
              <FeedbackBar />
            </FeedbackProvider>
          </LoadProvider>
        </AuthProvider>
      </Provider>
      <Environment />
    </ThemeProvider>
  );
};

export default App;
