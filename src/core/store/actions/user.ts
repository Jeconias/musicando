import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {
  UserListResponse,
  UserReadResponse,
  UserListRequest,
} from '~/core/api/api.user';
import {Event} from '~/core/entity/event';
import asyncThunk from '../utils/asyncThunk';
import {cleanAction} from './utils';

type EventBasic = Pick<
  Event,
  'uuid' | 'title' | 'description' | 'address' | 'value_ref' | 'date'
>;

interface UserSliceInterface {
  read: {
    loading: LoadingStatus;
    response?: UserReadResponse;
  };
  list: {
    pg: number;
    loading: LoadingStatus;
    response?: UserListResponse;
  };
}

export const userReadAsyncThunk = asyncThunk('/user/read', api.user.read, {
  condition: (_, state) =>
    !state.getState().user.read.response?.data?.events?.length,
});

export const userListAsyncThunk = asyncThunk('/user/list', api.user.list);

const userSlice = createSlice<
  UserSliceInterface,
  SliceCaseReducers<UserSliceInterface>
>({
  name: 'user',
  initialState: {
    read: {
      loading: 'idle',
      response: undefined,
    },
    list: {
      pg: 1,
      loading: 'idle',
      response: undefined,
    },
  },
  reducers: {
    addEvent(state, action: PayloadAction<EventBasic>) {
      if (Array.isArray(state.read.response?.data.events)) {
        state.read.response!.data.events = [
          action.payload as Event,
          ...(state.read.response?.data.events ?? []),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cleanAction.toString(), (state) => {
      state.read.response = undefined;
      state.list = {
        pg: 1,
        loading: 'idle',
        response: undefined,
      };
    });
    builder.addCase(userReadAsyncThunk.pending.toString(), (state) => {
      state.read.loading = 'loading';
    });
    builder.addCase<string, PayloadAction<UserReadResponse>>(
      userReadAsyncThunk.fulfilled.toString(),
      (state, action) => {
        state.read.response = action.payload;
        state.read.loading = 'ok';
      },
    );
    builder.addCase(userReadAsyncThunk.rejected.toString(), (state) => {
      state.read.loading = 'error';
    });

    //List
    builder.addCase(userListAsyncThunk.pending.toString(), (state) => {
      state.list.loading = 'loading';
    });
    builder.addCase<
      string,
      PayloadAction<UserListResponse, string, {arg?: UserListRequest}>
    >(userListAsyncThunk.fulfilled.toString(), (state, action) => {
      console.log(action);
      if (action?.meta?.arg?.pg && action?.meta?.arg?.pg >= 1) {
        state.list.pg = action?.meta?.arg.pg;
        state.list.response = {
          ...action.payload,
          data: {
            ...action.payload.data,
            data: [
              ...(state.list.response?.data.data ?? []),
              ...action.payload.data.data,
            ],
          },
        };
      } else {
        state.list.pg = 1;
        state.list.response = action.payload;
      }
      state.list.loading = 'ok';
    });
    builder.addCase(userListAsyncThunk.rejected.toString(), (state) => {
      state.list.loading = 'error';
    });
  },
});

export const {addEvent} = userSlice.actions;
export default userSlice;
