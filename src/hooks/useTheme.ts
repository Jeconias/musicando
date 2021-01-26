import {useContext} from 'react';
import {ManagerThemeContext} from '~/providers/ManagerThemeProvider';

const useTheme = () => useContext(ManagerThemeContext);

export default useTheme;
