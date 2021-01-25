import React from 'react';
import styled, {css} from 'styled-components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../Icon';
import {TouchableOpacityProps} from 'react-native';

interface ButtonCircledInterface extends TouchableOpacityProps {}

const ButtonCircled = ({...props}: ButtonCircledInterface) => {
  return (
    <TouchableOpacityStyled {...props}>
      <Icon icon="arrowRight" size="md" />
    </TouchableOpacityStyled>
  );
};

export default ButtonCircled;

const TouchableOpacityStyled = styled(TouchableOpacity)`
  ${({theme}) => css`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.primary};
    border-radius: 25px;
  `}
`;
