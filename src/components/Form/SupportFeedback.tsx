import React from 'react';
import {ComponentWithChildrenInterface} from '~/config/types';
import Text from '../Text';

const SupportFeedback = ({
  children,
}: ComponentWithChildrenInterface<string>) => (
  <Text size="xs" color="feedbackError">
    {children}
  </Text>
);

export default SupportFeedback;
