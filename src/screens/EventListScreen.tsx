import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';
import ButtonCircled from '~/components/Button/ButtonCircled';
import OpportunityCard from '~/components/Card/OpportunityCard';
import {SafeAreaView} from '~/components/common';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Loading from '~/components/Loading/Loading';
import {EventStackScreens, RequestError} from '~/config/types';
import {userReadAsyncThunk} from '~/core/store/actions/user';
import useAuth from '~/hooks/useAuth';
import useFeedback from '~/hooks/useFeedback';
import useNavigate from '~/hooks/useNavigate';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';

const EventListScreen = () => {
  const dispatch = useReduxDispatch();
  const {user} = useAuth();
  const {to, toggleDrawer} = useNavigate();
  const {feedback} = useFeedback();

  const {events, loading} = useReduxSelector((state) => ({
    events: state.user.read.response?.data?.events ?? [],
    loading: state.user.read.loading,
  }));

  useEffect(() => {
    if (!user || !user?.uuid) return;

    (async () => {
      const resp = await dispatch(userReadAsyncThunk({id: user.uuid}));
      if (
        userReadAsyncThunk.rejected.match(resp) &&
        resp.error.name !== 'ConditionError'
      ) {
        const error = resp.payload as RequestError;
        const message =
          error?.message ?? 'Ops! Tivemos um problema inesperado.';

        feedback({
          message,
          type: 'danger',
        });
      }
    })();
  }, [user, feedback]);

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{
          icon: 'system',
          backgroundColor: 'backgroundBlackSupport',
          onPress: toggleDrawer,
        }}
        title="Seus Eventos">
        {loading !== 'ok' && <Loading />}
        {loading === 'ok' && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={events}
            keyExtractor={(item) => item.uuid}
            renderItem={({item}) => (
              <OpportunityCard
                id={item.uuid}
                title={item.title}
                description={item.description}
                image=""
                price={item.value_ref}
              />
            )}
          />
        )}
        <ButtonPlusWrapper>
          <ButtonPlus
            icon="plus"
            onPress={() => to(EventStackScreens.Create)}
          />
        </ButtonPlusWrapper>
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default EventListScreen;

const ButtonPlusWrapper = styled.View`
  ${({theme}) => css`
    position: absolute;
    bottom: ${theme.spacing.xlg};
    right: 0;
    z-index: 10;
  `}
`;

const ButtonPlus = styled(ButtonCircled)``;
