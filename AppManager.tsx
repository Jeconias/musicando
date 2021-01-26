import React from 'react';
import ManagerThemeProvider from '~/providers/ManagerThemeProvider';
import App from './App';

const AppManager = () => (
  <ManagerThemeProvider>
    <App />
  </ManagerThemeProvider>
);

export default AppManager;
