import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

const Loading = ({...props}: ActivityIndicatorProps) => (
  <ActivityIndicator size="large" color="#fff" {...props} />
);

export default Loading;
