import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {
  EventCreateResponse,
  EventListResponse,
  EventListRequest,
} from '~/core/api/api.event';
import asyncThunk from '../utils/asyncThunk';
import {cleanAction} from './utils';

interface EventSliceInterface {
  create: {
    loading: LoadingStatus;
    response?: EventCreateResponse;
  };
  list: {
    pg: number;
    loading: LoadingStatus;
    response?: EventListResponse;
  };
}

export const eventCreateAsyncThunk = asyncThunk(
  '/event/create',
  api.event.create,
);

export const eventListAsyncThunk = asyncThunk('/event/list', api.event.list);

const eventSlice = createSlice<
  EventSliceInterface,
  SliceCaseReducers<EventSliceInterface>
>({
  name: 'event',
  initialState: {
    create: {
      loading: 'idle',
      response: undefined,
    },
    list: {
      pg: 1,
      loading: 'idle',
      response: undefined,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cleanAction.toString(), (state) => {
      state.create.response = undefined;
      state.list = {
        pg: 1,
        loading: 'idle',
        response: undefined,
      };
    });

    // Create
    builder.addCase(eventCreateAsyncThunk.pending.toString(), (state) => {
      state.create.loading = 'loading';
    });
    builder.addCase<string, PayloadAction<EventCreateResponse>>(
      eventCreateAsyncThunk.fulfilled.toString(),
      (state, action) => {
        state.create.response = action.payload;
        state.create.loading = 'ok';
      },
    );
    builder.addCase(eventCreateAsyncThunk.rejected.toString(), (state) => {
      state.create.loading = 'error';
    });

    // List
    builder.addCase(eventListAsyncThunk.pending.toString(), (state) => {
      state.list.loading = 'loading';
    });
    builder.addCase<
      string,
      PayloadAction<EventListResponse, string, {arg?: EventListRequest}>
    >(eventListAsyncThunk.fulfilled.toString(), (state, action) => {
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
    builder.addCase(eventListAsyncThunk.rejected.toString(), (state) => {
      state.list.loading = 'error';
    });
  },
});

export default eventSlice;
