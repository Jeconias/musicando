import React from 'react';
import {Animated, View} from 'react-native';
import {TouchableProps} from 'react-native-svg';
import styled, {css} from 'styled-components/native';
import {Color} from '~/config/types';
import Icon, {IconType} from '../Icon';
import Text from '../Text';
import {default as ContainerBase, ContainerProps} from './Container';

type IconHeader = {
  icon?: IconType;
  backgroundColor?: Color;
  onPress?(): void;
};

interface ContainerWithIconInterface extends ContainerProps, TouchableProps {
  iconRight?: IconHeader;
  iconLeft?: IconHeader;
  title?: string;
  opacity?: any;
}

const ContainerWithHeader = ({
  children,
  iconRight,
  iconLeft,
  title,
  opacity,
  ...props
}: ContainerWithIconInterface) => (
  <ContainerBase {...props}>
    <Wrapper>
      <Header style={{opacity: opacity}}>
        {iconLeft?.icon && (
          <CloseButton onPress={iconLeft.onPress}>
            <BackgroundIcon backgroundColor={iconLeft.backgroundColor}>
              <Icon icon={iconLeft.icon} size="sm" />
            </BackgroundIcon>
          </CloseButton>
        )}
        {title && <Text size="md">{title}</Text>}
        {iconRight?.icon && (
          <CloseButton onPress={iconRight.onPress}>
            <BackgroundIcon backgroundColor={iconRight.backgroundColor}>
              <Icon icon={iconRight.icon} />
            </BackgroundIcon>
          </CloseButton>
        )}
      </Header>
      {children}
    </Wrapper>
  </ContainerBase>
);

export default ContainerWithHeader;

const Wrapper = styled(View)`
  flex: 1;
  position: relative;
`;

const Header = styled(Animated.View)`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
    z-index: 2;
  `}
`;

const CloseButton = styled.TouchableOpacity`
  z-index: 5;
`;

const BackgroundIcon = styled(View)<{backgroundColor?: Color}>`
  ${({theme, backgroundColor}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 32px;
    height: 32px;

    ${backgroundColor &&
    css`
      background-color: ${theme.colors[backgroundColor]};
    `}
  `}
`;
