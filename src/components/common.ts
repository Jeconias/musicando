import styled, {css} from 'styled-components';
import {SafeAreaView as SafeAreaViewBase} from 'react-native';

export const SafeAreaView = styled(SafeAreaViewBase)`
  flex: 1;
  position: relative;
`;

export const fonts = {
  RubikBold: css`
    font-family: 'Rubik-Bold';
  `,
  RubikItalic: css`
    font-family: 'Rubik-Italic';
  `,
  RubikLight: css`
    font-family: 'Rubik-Light';
  `,
  RubikMedium: css`
    font-family: 'Rubik-Medium';
  `,
  RubikRegular: css`
    font-family: 'Rubik-Regular';
  `,
};
