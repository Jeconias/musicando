import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import styled, {css} from 'styled-components';

export interface InputInterface extends TextInputProps {
  tag?: React.ElementType;
}

const Input = ({...props}: InputInterface) => <TextInputStyled {...props} />;

export default Input;

const TextInputStyled = styled(({tag: Tag, ...props}) =>
  Tag ? <Tag {...props} /> : <TextInput {...props} />,
)`
  ${({theme}) => css`
    padding: ${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.xs} 0;
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.white};
    letter-spacing: 1.25px;
    border-bottom-width: 1px;
    border-color: ${theme.colors.white};
  `}
`;
