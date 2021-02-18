import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {DealReadResponse} from '~/core/api/api.deal.types';
import asyncThunk from '../utils/asyncThunk';
import {cleanAction} from './utils';

interface DealSliceInterface {
  read: {
    loading: LoadingStatus;
    response?: DealReadResponse;
  };
}

export const dealCreateAsyncThunk = asyncThunk('/deal/create', api.deal.create);

export const dealReadAsyncThunk = asyncThunk('/deal/read', api.deal.read);

const dealSlice = createSlice<
  DealSliceInterface,
  SliceCaseReducers<DealSliceInterface>
>({
  name: 'deal',
  initialState: {
    read: {
      loading: 'idle',
      response: undefined,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cleanAction.toString(), (state) => {
      state.read = {
        loading: 'idle',
      };
    });

    // Read
    builder.addCase(dealReadAsyncThunk.pending.toString(), (state) => {
      state.read.loading = 'loading';
    });
    builder.addCase<string, PayloadAction<DealReadResponse>>(
      dealReadAsyncThunk.fulfilled.toString(),
      (state, action) => {
        console.log(action);
        state.read.response = action.payload;
        state.read.loading = 'ok';
      },
    );
    builder.addCase(dealReadAsyncThunk.rejected.toString(), (state) => {
      state.read.loading = 'error';
    });
  },
});

export default dealSlice;
