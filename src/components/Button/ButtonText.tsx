import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TouchableProps} from 'react-native-svg';
import {Color, ComponentWithChildrenInterface, Size} from '~/config/types';
import Text from '../Text';

interface ButtonTextInterface
  extends TouchableProps,
    ComponentWithChildrenInterface<string> {
  size?: Size;
  color?: Color;
}

const ButtonText = ({children, size, color, ...props}: ButtonTextInterface) => (
  <TouchableOpacity {...props}>
    <Text size={size} color={color}>
      {children}
    </Text>
  </TouchableOpacity>
);

export default ButtonText;
