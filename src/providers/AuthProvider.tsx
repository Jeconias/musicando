import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ComponentWithChildrenInterface, LoadingStatus} from '~/config/types';
import {AuthenticationResponse} from '~/core/api/api.auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_PREFIX, TOKEN_STORAGE_KEY} from '~/config/constants';
import {User} from '~/core/entity/user';
import {isEmpty, merge} from 'lodash';

export interface AuthContextInterface {
  user?: User;
  isAuthenticated?: boolean;
  stateHasRecovered?: boolean;
  handleOnSuccess(data: AuthenticationResponse): void;
  handleUpdate(data: Partial<User>): void;
  logout(): void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);

const userStorageKey = `${STORAGE_PREFIX}:user`;

const AuthProvider = ({children}: ComponentWithChildrenInterface) => {
  const [loading, setLoading] = useState<LoadingStatus>('idle');
  const [user, setUser] = useState<User>();

  const isAuthenticatedMemorized = useMemo(() => !isEmpty(user), [user]);

  const handleOnSuccess = useCallback(
    async (data: AuthenticationResponse) => {
      setLoading('loading');
      if (data.data.token && !isEmpty(data.data.user)) {
        const userData = data.data.user;

        await AsyncStorage.multiSet(
          [
            [TOKEN_STORAGE_KEY, data.data.token],
            [userStorageKey, JSON.stringify(userData)],
          ],
          (errors) => {
            if (errors) {
              //TODO(Jeconias): Fix it.
              console.error('handleonSuccess Error - ', errors);
            } else {
              setTimeout(() => {
                setUser(userData);
                setLoading('ok');
              }, 200);
            }
          },
        );
      }
    },
    [setLoading, setUser],
  );

  const handleStateRecovery = useCallback(async () => {
    setLoading('loading');

    await AsyncStorage.multiGet(
      [TOKEN_STORAGE_KEY, userStorageKey],
      (errors, result) => {
        if (errors) {
          //TODO(Jeconias): Fix it.
          console.error('State Recovery Error - ', errors);
        } else {
          if (Array.isArray(result) && result.length === 2 && result[0]) {
            const hasToken = result[0][1];
            const hasUserData = result[1][1];

            if (hasToken && hasUserData) {
              setUser(JSON.parse(hasUserData));
            }
          } else {
            //TODO(Jeconias): Fix it.
            console.error('State Recovery Error - ', errors);
          }
        }
      },
    );

    setLoading('ok');
  }, [setLoading]);

  const handleLogout = useCallback(async () => {
    setLoading('loading');

    await AsyncStorage.multiRemove(
      [TOKEN_STORAGE_KEY, userStorageKey],
      (error) => {
        if (error) {
          //TODO(Jeconias): Fix it.
          console.error('Logout Error - ', error);
        } else {
          setUser(undefined);
        }
        setLoading('ok');
      },
    );
  }, []);

  const handleUpdate = useCallback(
    (data: Partial<User>) => setUser((prev) => ({...prev, ...(data as User)})),
    [setUser],
  );

  useEffect(() => {
    if (!user) handleStateRecovery();
  }, [user, handleStateRecovery]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuthenticatedMemorized,
        stateHasRecovered: loading === 'ok',
        handleOnSuccess,
        handleUpdate,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
