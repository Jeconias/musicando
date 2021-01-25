import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ComponentWithChildrenInterface} from '~/config/types';

interface LightBoxViewInterface extends ComponentWithChildrenInterface {}

const LightBoxView = ({children}: LightBoxViewInterface) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <View onTouchEnd={toggle}>
      {children}
      <Modal isVisible={isOpen} onBackButtonPress={toggle}>
        {React.cloneElement(children as any, {
          style: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderRadius: 0,
          },
        })}
      </Modal>
    </View>
  );
};

export default LightBoxView;
