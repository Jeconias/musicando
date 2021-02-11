import React from 'react';
import styled, {css} from 'styled-components/native';
import {ComponentWithChildrenInterface} from '~/config/types';

interface DefaultImageInterface extends ComponentWithChildrenInterface {}

const DefaultImage = ({...props}: DefaultImageInterface) => (
  <ViewStyled {...props} />
);

export default DefaultImage;

const ViewStyled = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 32px;
    margin-right: ${({theme}) => theme.spacing.sm};
    background-color: ${theme.colors.backgroundBlackOpacity};
  `}
`;
