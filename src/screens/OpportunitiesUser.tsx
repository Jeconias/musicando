import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';
import OpportunityCard from '~/components/Card/OpportunityCard';
import Feedback from '~/components/Feedback/Feedback';
import FeedBackError from '~/components/Feedback/FeedBackError';
import Loading from '~/components/Loading/Loading';
import {EntityType, UserType} from '~/core/entity/common';
import {userListAsyncThunk} from '~/core/store/actions/user';
import useNavigate from '~/hooks/useNavigate';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import useReduxSelector from '~/hooks/useReduxSelector';
import {AppStackScreens, RootStackScreens} from '~/config/types.ts';

const OpportunitiesUser = () => {
  const dispatch = useReduxDispatch();
  const {to} = useNavigate();

  const {pg, loading, users, hasMore} = useReduxSelector((state) => ({
    pg: state.user.list.pg ?? 1,
    loading: state.user.list.loading,
    users: state.user.list.response?.data.data.filter(
      (el) => el.userType === UserType.MUSICIAN,
    ),
    hasMore: state.user.list.response?.data.hasMore,
  }));

  const handleWithUserList = useCallback(async () => {
    if (!hasMore || loading === 'loading') return;
    await dispatch(userListAsyncThunk({pg: pg + 1}));
  }, [dispatch, pg, hasMore, loading]);

  useEffect(() => {
    (async () => {
      await dispatch(userListAsyncThunk({}));
    })();
  }, []);

  return (
    <React.Fragment>
      {loading === 'error' && (!users || users?.length === 0) && (
        <FeedBackError />
      )}
      {loading === 'ok' && users?.length === 0 && (
        <Feedback
          title="Nenhum músico encontrado no momento 😪"
          text="Verifique os filtros e tente novamente."
        />
      )}
      {loading === 'loading' && (users?.length === 0 || !users) && <Loading />}
      {users && users?.length !== 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          onEndReached={handleWithUserList}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.uuid}
          renderItem={({item}) => (
            <OpportunityCard
              id={item.uuid}
              title={item.nick_name ?? item.nickName ?? item.name}
              description={
                item.userType === UserType.MUSICIAN
                  ? 'Músico'
                  : item.userType === UserType.PROMOTER
                  ? 'Promotor'
                  : ''
              }
              image={item?.photo ?? ''}
              price={0}
              type={EntityType.USER}
              onSelect={() =>
                to(RootStackScreens.AppStack, {
                  screen: AppStackScreens.UserProfile,
                  params: {
                    user: item,
                  },
                })
              }
            />
          )}
          ListFooterComponent={() => (
            <React.Fragment>
              {loading === 'loading' && users?.length !== 0 && <Loading />}
            </React.Fragment>
          )}
        />
      )}
    </React.Fragment>
  );
};

export default OpportunitiesUser;
