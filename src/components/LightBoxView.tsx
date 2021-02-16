import React from 'react';
import {default as RNModal, ModalProps} from 'react-native-modal';
import styled, {css} from 'styled-components/native';
import useTheme from '~/hooks/useTheme';
import Icon from './Icon';
interface LightBoxViewInterface extends ModalProps {}

const LightBoxView = ({
  children,
  onBackButtonPress,
  ...props
}: LightBoxViewInterface) => {
  const {theme} = useTheme();

  return (
    <RNModal
      {...props}
      onBackButtonPress={onBackButtonPress}
      backdropOpacity={1}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropColor={theme.colors.backgroundBlack}>
      <ModalBackground>
        <ButtonWrapper>
          <ToBack onPress={onBackButtonPress}>
            <Icon icon="arrowLeft" size="sm" />
          </ToBack>
        </ButtonWrapper>
        {children}
      </ModalBackground>
    </RNModal>
  );
};

export default LightBoxView;

const ButtonWrapper = styled.View`
  ${({theme}) => css`
    width: 100%;
    margin-bottom: ${theme.spacing.md};
  `}
`;

const ToBack = styled.TouchableOpacity`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 32px;
    height: 32px;
    background-color: ${theme.colors.backgroundBlackSupport};
  `}
`;

const ModalBackground = styled.View`
  flex: 1;
`;
