import React from 'react';
import styled, {css} from 'styled-components';
import {Text as TextBase, TextProps} from 'react-native';
import {Size, ComponentWithChildrenInterface, Color} from '~/config/types';

interface TextInterface
  extends ComponentWithChildrenInterface<string | JSX.Element>,
    TextProps {
  size?: Size;
  color?: Color;
  marginBottom?: Size;
  marginLeft?: Size | 'auto';
  textAlign?: 'center';
}

const Text = ({...props}: TextInterface) => <TextStyled {...props} />;

export default Text;

const TextStyled = styled(TextBase)<{
  size?: Size;
  color?: Color;
  marginBottom?: Size;
  marginLeft?: Size | 'auto';
  textAlign?: 'center';
}>`
  ${({theme, size, color, marginBottom, marginLeft, textAlign}) => css`
    font-family: 'Rubik-Regular';
    color: ${theme.colors.white};
    font-size: ${size ? theme.fontSize[size] : theme.fontSize.md};
    color: ${color ? theme.colors[color] : theme.colors.white};
    margin-bottom: ${marginBottom ? theme.spacing[marginBottom] : 0};
    text-align: ${textAlign ? textAlign : 'left'};
  `};
`;
