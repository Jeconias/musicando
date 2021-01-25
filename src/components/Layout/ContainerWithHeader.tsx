import React from 'react';
import {View} from 'react-native';
import {TouchableProps} from 'react-native-svg';
import styled, {css} from 'styled-components/native';
import Icon, {IconType} from '../Icon';
import Text from '../Text';
import {default as ContainerBase, ContainerProps} from './Container';

interface ContainerWithIconInterface extends ContainerProps, TouchableProps {
  iconRight?: IconType;
  iconLeft?: IconType;
  title?: string;
  onPressIconRight?(): void;
  onPressIconLeft?(): void;
}

const ContainerWithHeader = ({
  children,
  iconRight,
  iconLeft,
  onPressIconRight,
  onPressIconLeft,
  title,
  ...props
}: ContainerWithIconInterface) => (
  <Container {...props}>
    <Wrapper>
      <Header>
        {iconLeft && (
          <CloseButton onPress={onPressIconLeft}>
            <BackgroundIcon withBackground>
              <Icon icon={iconLeft} size="sm" />
            </BackgroundIcon>
          </CloseButton>
        )}
        {title && <Text size="md">{title}</Text>}
        {iconRight && (
          <CloseButton onPress={onPressIconRight}>
            <BackgroundIcon>
              <Icon icon={iconRight} />
            </BackgroundIcon>
          </CloseButton>
        )}
      </Header>
      {children}
    </Wrapper>
  </Container>
);

export default ContainerWithHeader;

const Wrapper = styled(View)`
  flex: 1;
  position: relative;
`;

const Header = styled(View)`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
  `}
`;

const Container = styled(ContainerBase)``;

const CloseButton = styled.TouchableOpacity`
  z-index: 5;
`;

const BackgroundIcon = styled(View)<{withBackground?: boolean}>`
  ${({theme, withBackground}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 32px;
    height: 32px;

    ${withBackground &&
    css`
      background-color: ${theme.colors.primary};
    `}
  `}
`;
