import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';
import ButtonCircled from '~/components/Button/ButtonCircled';
import OpportunityCard from '~/components/Card/OpportunityCard';
import {SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import FeedBackError from '~/components/Feedback/FeedBackError';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import Loading from '~/components/Loading/Loading';
import {EventStackScreens, LoadingStatus, RequestError} from '~/config/types';
import {userReadAsyncThunk} from '~/core/store/actions/user';
import useAuth from '~/hooks/useAuth';
import useFeedback from '~/hooks/useFeedback';
import useFirebase from '~/hooks/useFirebase';
import useNavigate from '~/hooks/useNavigate';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';

type EventCover = {[k: string]: string | undefined};

const EventListScreen = () => {
  const dispatch = useReduxDispatch();
  const {user} = useAuth();
  const {to, toggleDrawer} = useNavigate();
  const {feedback} = useFeedback();
  const {
    event: {getCover},
  } = useFirebase();

  const {events, loading} = useReduxSelector((state) => ({
    events: state.user.read.response?.data?.events ?? [],
    loading: state.user.read.loading,
  }));

  const [eventsCover, setEventsCover] = useState<EventCover>({});
  const [localLoading, setLocalLoading] = useState<LoadingStatus>('idle');

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

  useEffect(() => {
    if (events.length === Object.keys(eventsCover).length) return;
    setLocalLoading('loading');
    let unmounted = false;

    (async () => {
      const nEventsCover: EventCover = {};
      for (let i = 0; i < events.length; i++) {
        const hasImage = eventsCover[events[i].uuid];
        if (hasImage) continue;
        const image = await getCover(events[i].uuid);
        nEventsCover[events[i].uuid] = image || '';
      }
      if (!unmounted) {
        setEventsCover(nEventsCover);
        setLocalLoading('ok');
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [events, getCover, eventsCover, setEventsCover]);

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{
          icon: 'system',
          backgroundColor: 'backgroundBlackSupport',
          onPress: toggleDrawer,
        }}
        title="Seus Eventos">
        {loading === 'error' && (!events || events.length === 0) && (
          <FeedBackError />
        )}
        {loading === 'ok' && events.length === 0 && (
          <Feedback
            title="Sem Eventos 😪"
            text="Nenhum evento foi cadastrado."
          />
        )}
        {(loading === 'loading' || localLoading === 'loading') && <Loading />}
        {loading === 'ok' && localLoading === 'ok' && events.length !== 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={events}
            keyExtractor={(item) => item.uuid}
            renderItem={({item}) => (
              <OpportunityCard
                id={item.uuid}
                title={item.title}
                description={item.description}
                image={item?.cover || eventsCover[item.uuid] || ''}
                price={item.value_ref ?? 0}
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
