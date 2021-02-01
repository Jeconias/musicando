import React, {createContext, useCallback} from 'react';
import {showMessage} from 'react-native-flash-message';
import {ComponentWithChildrenInterface} from '~/config/types';
import useTheme from '~/hooks/useTheme';

export type FeedbackType = 'warning' | 'info' | 'danger' | 'success';
interface FeedbackMessage {
  message: string;
  type?: FeedbackType;
  onHide?(): void;
}

interface FeedbackProviderInterface {
  feedback(data: FeedbackMessage): void;
}

export const FeedbackContext = createContext<FeedbackProviderInterface>(
  {} as FeedbackProviderInterface,
);

const FeedbackProvider = ({children}: ComponentWithChildrenInterface) => {
  const {theme} = useTheme();

  const handleFeedback = useCallback(
    ({message, type = 'info', onHide}: FeedbackMessage) => {
      let backgroundColor = theme.colors.feedbackSupport;
      if (type === 'success') backgroundColor = theme.colors.feedbackSuccess;
      if (type === 'warning') backgroundColor = theme.colors.feedbackSupport;
      if (type === 'danger') backgroundColor = theme.colors.feedbackError;

      showMessage({
        message,
        type,
        backgroundColor,
        onHide,
      });
    },
    [theme],
  );

  return (
    <FeedbackContext.Provider
      value={{
        feedback: handleFeedback,
      }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
