import React from 'react';
import {ImageProps} from 'react-native';
import styled from 'styled-components/native';

export interface ImgInterface extends ImageProps {}

const Img = ({...props}: ImgInterface) => <ImageStyled {...props} />;

export default Img;

const ImageStyled = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;
