import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {
  DealDeleteRequest,
  DealDeleteResponse,
  DealReadResponse,
} from '~/core/api/api.deal.types';
import asyncThunk from '../utils/asyncThunk';
import {cleanAction} from './utils';

interface DealSliceInterface {
  read: {
    loading: LoadingStatus;
    response?: DealReadResponse;
  };
  delete: {
    loading: LoadingStatus;
  };
}

export const dealCreateAsyncThunk = asyncThunk('/deal/create', api.deal.create);

export const dealReadAsyncThunk = asyncThunk('/deal/read', api.deal.read);

export const dealDeleteAsyncThunk = asyncThunk('/deal/delete', api.deal.delete);

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
    delete: {
      loading: 'idle',
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
        state.read.response = action.payload;
        state.read.loading = 'ok';
      },
    );
    builder.addCase(dealReadAsyncThunk.rejected.toString(), (state) => {
      state.read.loading = 'error';
    });

    // Delete
    builder.addCase(dealDeleteAsyncThunk.pending.toString(), (state) => {
      state.delete.loading = 'loading';
    });
    builder.addCase<
      string,
      PayloadAction<DealDeleteResponse, string, {arg?: DealDeleteRequest}>
    >(dealDeleteAsyncThunk.fulfilled.toString(), (state, action) => {
      const deals = (state.read.response?.data?.deals || []).filter(
        (d) => d.uuid !== action.meta.arg?.uuid,
      );

      state.read.response!.data!.deals = deals || [];
      state.delete.loading = 'ok';
    });
    builder.addCase(dealDeleteAsyncThunk.rejected.toString(), (state) => {
      state.delete.loading = 'error';
    });
  },
});

export default dealSlice;
