import {useContext} from 'react';
import {FeedbackContext} from '~/providers/FeedbackProvider';

const useFeedback = () => useContext(FeedbackContext);

export default useFeedback;
