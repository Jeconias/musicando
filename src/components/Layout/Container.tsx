import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import styled, {css} from 'styled-components';
import {ComponentWithChildrenInterface} from '~/config/types';

export interface ContainerProps extends ComponentWithChildrenInterface {
  justifyContent?: 'center';
}

const Container = ({...props}: ContainerProps) => (
  <KeyboardAvoidingViewStyled
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    enabled>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: 'red'}}>
      <ViewStyled {...props} />
    </ScrollView>
  </KeyboardAvoidingViewStyled>
);

export default Container;

const KeyboardAvoidingViewStyled = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const ViewStyled = styled(View)<ContainerProps>`
  ${({theme, justifyContent}) => css`
    flex: 1;
    position: relative;
    padding: ${theme.spacing.md};
    padding-bottom: 0;
    background-color: ${theme.colors.backgroundBlack};
    justify-content: ${justifyContent ? justifyContent : 'flex-start'};
  `};
`;
