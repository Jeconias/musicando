import {math} from 'polished';
import React from 'react';
import styled, {css} from 'styled-components/native';
import Text from '../Text';

interface FeedbackInterface {
  title: string;
  text: string;
}

const Feedback = ({title, text}: FeedbackInterface) => (
  <ViewStyled>
    <Text size="md" marginBottom="xxs">
      {title}
    </Text>
    <Text size="xs">{text}</Text>
  </ViewStyled>
);

export default Feedback;

const ViewStyled = styled.View`
  ${({theme}) => css`
    flex: 1;
    align-items: center;
    padding-top: ${(theme.device.dimensions.window.height / 100) * 25}px;
  `}
`;
