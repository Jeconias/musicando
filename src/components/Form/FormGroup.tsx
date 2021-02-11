import React from 'react';
import {Button, View} from 'react-native';
import {TextInputMaskProps} from 'react-native-masked-text';
import styled, {css} from 'styled-components/native';
import ButtonText from '../Button/ButtonText';
import Icon, {IconType} from '../Icon';
import Text from '../Text';
import Input, {InputInterface} from './Input';
import SupportFeedback from './SupportFeedback';

interface FormGroupInterface extends InputInterface {
  error?: string;
  icon?: IconType;
  inputMaskProps?: TextInputMaskProps;
}

const FormGroup = ({
  error,
  icon,
  style,
  inputMaskProps,
  ...props
}: FormGroupInterface) => {
  return (
    <Wrapper style={style}>
      {icon && (
        <WrapperIcon>
          <Icon icon={icon} size="sm" />
        </WrapperIcon>
      )}
      <InputStyled
        {...props}
        {...inputMaskProps}
        hasIcon={!!icon}
        error={!!error}
      />
      {error && <SupportFeedback>{error}</SupportFeedback>}
    </Wrapper>
  );
};

export default FormGroup;

const Wrapper = styled(View)`
  ${({theme}) => css`
    position: relative;
    margin: 0 ${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.xs};
  `}
`;

const InputStyled = styled(Input)<{error?: boolean; hasIcon?: boolean}>`
  ${({theme, hasIcon, error}) => css`
    margin-bottom: ${theme.spacing.xxs};
    border-color: ${error ? theme.colors.feedbackError : theme.colors.white};
    ${hasIcon &&
    css`
      padding-left: ${theme.spacing.lg};
    `}
  `}
`;

const WrapperIcon = styled.View`
  position: absolute;
  justify-content: center;
  top: 0;
  bottom: 0;
  margin: auto 0;
  max-height: 45px;
`;
