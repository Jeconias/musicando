import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {EventCreateResponse} from '~/core/api/api.event';
import asyncThunk from '../utils/asyncThunk';

interface EventSliceInterface {
  create: {
    loading: LoadingStatus;
    response?: EventCreateResponse;
  };
}

export const eventCreateAsyncThunk = asyncThunk(
  '/event/create',
  api.event.create,
);

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
  },
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default eventSlice;
