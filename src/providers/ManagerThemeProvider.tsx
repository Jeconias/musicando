import {merge} from 'lodash';
import React, {createContext, useCallback, useState} from 'react';
import {DefaultTheme} from 'styled-components';
import {THEME} from '~/config/constants';
import {ComponentWithChildrenInterface} from '~/config/types';

interface ManagerThemeProviderInterface {
  updateTheme(data: Partial<DefaultTheme>): void;
  theme: DefaultTheme;
}

export const ManagerThemeContext = createContext<ManagerThemeProviderInterface>(
  {} as ManagerThemeProviderInterface,
);

const ManagerThemeProvider = ({children}: ComponentWithChildrenInterface) => {
  const [theme, setTheme] = useState<DefaultTheme>(THEME);

  const handleUpdate = useCallback(
    (data: Partial<DefaultTheme>) => setTheme((prev) => merge(prev, data)),
    [setTheme],
  );

  return (
    <ManagerThemeContext.Provider
      value={{
        theme,
        updateTheme: handleUpdate,
      }}>
      {children}
    </ManagerThemeContext.Provider>
  );
};

export default ManagerThemeProvider;
