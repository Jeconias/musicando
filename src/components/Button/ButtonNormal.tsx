import React from 'react';
import {Text as TextBase} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TouchableProps} from 'react-native-svg';
import styled, {css} from 'styled-components';
import {ComponentWithChildrenInterface, Size} from '~/config/types';

interface ButtonNormalInterface
  extends TouchableProps,
    ComponentWithChildrenInterface<string | JSX.Element> {
  size?: Size;
}

const ButtonNormal = ({children, size, ...props}: ButtonNormalInterface) => {
  return (
    <TouchableOpacityStyled size={size} {...props}>
      <Text size={size}>{children}</Text>
    </TouchableOpacityStyled>
  );
};

export default ButtonNormal;

const Text = styled(TextBase)<{size?: Size}>`
  ${({theme, size}) => css`
    font-weight: 500;
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.white};
    text-align: center;

    ${size === 'sm' &&
    css`
      font-size: ${theme.fontSize.sm};
    `}
  `}
`;

const TouchableOpacityStyled = styled(TouchableOpacity)<{
  size?: Size;
  disabled?: boolean;
}>`
  ${({theme, size, disabled}) => css`
    align-items: center;
    height: 50px;
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    background-color: ${theme.colors.primary};
    border-radius: 7px;

    ${disabled &&
    css`
      background-color: ${theme.colors.backgroundBlackSupport};
      color: ${theme.colors.text};
    `}

    ${size === 'sm' &&
    css`
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
    `}
  `}
`;
