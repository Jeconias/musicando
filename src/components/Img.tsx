import React from 'react';
import {Image, ImageProps} from 'react-native';
import styled from 'styled-components';

interface Img extends ImageProps {}

const Img = ({...props}: Img) => <ImageStyled {...props} />;

export default Img;

const ImageStyled = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;
