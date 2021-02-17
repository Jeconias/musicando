import React from 'react';
import styled, {css} from 'styled-components/native';
import Text from '../Text';

interface FeedbackInterface {
  title: string;
  text: string;
}

const Feedback = ({title, text, ...props}: FeedbackInterface) => (
  <ViewStyled {...props}>
    <Text size="sm" marginBottom="xxs" textAlign="center">
      {title}
    </Text>
    <Text size="xs" textAlign="center" color="text">
      {text}
    </Text>
  </ViewStyled>
);

export default Feedback;

const ViewStyled = styled.View`
  ${({theme}) => css`
    flex: 1;
    align-items: center;
    justify-content: center;
  `}
`;
