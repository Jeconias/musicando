import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useCallback, useEffect, useState} from 'react';
import FullLoading from '~/components/Loading/FullLoading';
import {STORAGE_PREFIX} from '~/config/constants';
import {ComponentWithChildrenInterface, LoadingStatus} from '~/config/types';
import useAuth from '~/hooks/useAuth';

interface LoadContextInterface {
  isFirstAccess: boolean;
  handleWithFirstAccess(): void;
}

export const LoadContext = createContext<LoadContextInterface>(
  {} as LoadContextInterface,
);

const isFirstAccessKey = `${STORAGE_PREFIX}:isFirstAccess`;

const LoadProvider = ({children}: ComponentWithChildrenInterface) => {
  const {stateHasRecovered} = useAuth();

  const [loading, setLoading] = useState<LoadingStatus>('idle');
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(true);

  const isFirstAccessMemorized = useCallback(
    () => AsyncStorage.getItem(isFirstAccessKey),
    [],
  );

  const handleWithFirstAccess = useCallback(() => {
    AsyncStorage.setItem(isFirstAccessKey, JSON.stringify(false));
  }, [isFirstAccessKey, setLoading]);

  useEffect(() => {
    (async () => {
      const resp = await isFirstAccessMemorized();

      setIsFirstAccess(resp ? JSON.parse(resp) : true);
      setLoading('ok');
    })();
  }, [isFirstAccessMemorized, setIsFirstAccess]);

  if (loading !== 'ok' || !stateHasRecovered) return <FullLoading />;

  return (
    <LoadContext.Provider value={{isFirstAccess, handleWithFirstAccess}}>
      {children}
    </LoadContext.Provider>
  );
};

export default LoadProvider;
