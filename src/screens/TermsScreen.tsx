import React from 'react';
import {SafeAreaView} from '~/components/common';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Text from '~/components/Text';
import useNavigate from '~/hooks/useNavigate';

const TermsScreen = () => {
  const {goBack} = useNavigate();

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft="arrowLeft"
        onPressIconLeft={goBack}
        title="Termos">
        <Text>...</Text>
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default TermsScreen;
