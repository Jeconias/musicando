import React, {createContext, useCallback} from 'react';
import {ComponentWithChildrenInterface} from '~/config/types';
import {showMessage} from 'react-native-flash-message';
import useTheme from '~/hooks/useTheme';

interface FeedbackMessage {
  message: string;
  type?: 'warning' | 'info' | 'danger' | 'success';
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
    ({message, type = 'info'}: FeedbackMessage) => {
      let backgroundColor = theme.colors.feedbackSupport;
      if (type === 'success') backgroundColor = theme.colors.feedbackSuccess;
      if (type === 'warning') backgroundColor = theme.colors.feedbackSupport;
      if (type === 'danger') backgroundColor = theme.colors.feedbackError;

      showMessage({
        message,
        type,
        backgroundColor,
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
