import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {UserReadResponse} from '~/core/api/api.user';
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
}

export const userReadAsyncThunk = asyncThunk('/user/read', api.user.read, {
  condition: (_, state) =>
    !state.getState().user.read.response?.data?.events?.length,
});

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
  },
});

export const {addEvent} = userSlice.actions;
export default userSlice;
