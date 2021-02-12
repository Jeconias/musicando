import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';
import OpportunityCard from '~/components/Card/OpportunityCard';
import Feedback from '~/components/Feedback/Feedback';
import FeedBackError from '~/components/Feedback/FeedBackError';
import Loading from '~/components/Loading/Loading';
import {eventListAsyncThunk} from '~/core/store/actions/event';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';

const OpportunitiesEvent = () => {
  const dispatch = useReduxDispatch();

  const {events, hasMore, pg, loading} = useReduxSelector((state) => ({
    pg: state.event.list.pg || 1,
    loading: state.event.list.loading,
    events: state.event.list.response?.data.data,
    hasMore: state.event.list.response?.data.hasMore,
  }));

  const handleWithEventList = useCallback(async () => {
    if (!hasMore || loading === 'loading') return;
    await dispatch(eventListAsyncThunk({pg: pg + 1}));
  }, [dispatch, pg, hasMore, loading]);

  useEffect(() => {
    (async () => {
      await dispatch(eventListAsyncThunk({}));
    })();
  }, []);

  return (
    <React.Fragment>
      {loading === 'error' && (!events || events?.length === 0) && (
        <FeedBackError />
      )}
      {loading === 'ok' && events?.length === 0 && (
        <Feedback
          title="Nenhuma Oportunidade no momento 😪"
          text="Verifique os filtros e tente novamente."
        />
      )}
      {loading === 'loading' && (events?.length === 0 || !events) && (
        <Loading />
      )}
      {events && events?.length !== 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={events}
          onEndReached={handleWithEventList}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.uuid}
          renderItem={({item}) => (
            <OpportunityCard
              id={item.uuid}
              title={item.title}
              description={item.description}
              image={item?.cover || ''}
              price={item.valueRef || item.value_ref || 0}
            />
          )}
          ListFooterComponent={() => (
            <React.Fragment>
              {loading === 'loading' && events?.length !== 0 && <Loading />}
            </React.Fragment>
          )}
        />
      )}
    </React.Fragment>
  );
};

export default OpportunitiesEvent;
