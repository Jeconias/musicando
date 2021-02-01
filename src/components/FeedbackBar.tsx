import React, {useEffect} from 'react';
import FlashMessage from 'react-native-flash-message';
import {feedbackAction} from '~/core/store/actions/feedback';
import useFeedback from '~/hooks/useFeedback';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';

const FeedbackBar = () => {
  const dispatch = useReduxDispatch();
  const {feedback} = useFeedback();
  const {type, message} = useReduxSelector((state) => state.feedback?.data);

  useEffect(() => {
    if (message) {
      feedback({
        type,
        message,
        onHide: () => {
          dispatch(feedbackAction({type: 'info', message: undefined}));
        },
      });
    }
  }, [dispatch, feedback, type, message]);

  return <FlashMessage position="bottom" />;
};

export default FeedbackBar;
