import React, {useCallback} from 'react';
import styled, {css} from 'styled-components/native';
import {ComponentWithChildrenInterface} from '~/config/types';
import Text from '../Text';

interface RadioInterface extends ComponentWithChildrenInterface<string> {
  value: string | number;
  isChecked: boolean;
  onSelected(value: RadioInterface['value']): void;
}

const Radio = ({
  value,
  onSelected,
  isChecked,
  children,
  ...props
}: RadioInterface) => {
  const handleSelected = useCallback(() => {
    onSelected(value);
  }, [value, onSelected]);

  return (
    <RadioStyled {...props} onPress={handleSelected}>
      <CircleBorder isChecked={isChecked}>
        {isChecked && <CircleBackground />}
      </CircleBorder>
      <Text size="sm">{children}</Text>
    </RadioStyled>
  );
};

export default Radio;

const RadioStyled = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CircleBorder = styled.View<{isChecked: boolean}>`
  ${({theme, isChecked}) => css`
    position: relative;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    border-width: 1.5px;
    border-color: ${theme.colors.primary};
    padding: 2px;
    margin-right: ${theme.spacing.xs};

    ${!isChecked &&
    css`
      border-color: ${theme.colors.white};
    `}
  `}
`;

const CircleBackground = styled.View`
  ${({theme}) => css`
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background-color: ${theme.colors.primary};
  `}
`;
