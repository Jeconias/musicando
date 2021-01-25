import 'styled-components';
import {THEME} from '../constants';

type Theme = typeof THEME;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
