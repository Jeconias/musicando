import React from 'react';
import {ScrollView as RNScrollView} from 'react-native';

const ScrollView = ({...props}) => (
  <RNScrollView
    {...props}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{flexGrow: 1}}
  />
);

export default ScrollView;
