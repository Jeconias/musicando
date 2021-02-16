import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import asyncThunk from '../utils/asyncThunk';

interface ProposalSliceInterface {
  create: {
    loading: LoadingStatus;
  };
}

export const proposalCreateAsyncThunk = asyncThunk(
  '/proposal/create',
  api.proposal.create,
);

const proposalSlice = createSlice<
  ProposalSliceInterface,
  SliceCaseReducers<ProposalSliceInterface>
>({
  name: 'proposal',
  initialState: {
    create: {
      loading: 'idle',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(proposalCreateAsyncThunk.pending.toString(), (state) => {
      state.create.loading = 'loading';
    });
    builder.addCase(proposalCreateAsyncThunk.fulfilled.toString(), (state) => {
      state.create.loading = 'ok';
    });
    builder.addCase(proposalCreateAsyncThunk.rejected.toString(), (state) => {
      state.create.loading = 'error';
    });
  },
});

export default proposalSlice;
