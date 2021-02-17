import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {ProposalListResponse} from '~/core/api/api.proposal';
import {Proposal} from '~/core/entity/proposal';
import asyncThunk from '../utils/asyncThunk';

interface ProposalSliceInterface {
  create: {
    loading: LoadingStatus;
  };
  list: {
    loading: LoadingStatus;
    response?: Proposal[];
  };
}

export const proposalCreateAsyncThunk = asyncThunk(
  '/proposal/create',
  api.proposal.create,
);

export const proposalListAsyncThunk = asyncThunk(
  '/proposal/list',
  api.proposal.list,
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
    list: {
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

    //List
    builder.addCase(
      proposalListAsyncThunk.pending.toString(),
      (state, action) => {
        state.list.loading = 'loading';
      },
    );
    builder.addCase<string, PayloadAction<ProposalListResponse>>(
      proposalListAsyncThunk.fulfilled.toString(),
      (state, action) => {
        state.list.loading = 'ok';
        state.list.response = action.payload.data.proposals;
      },
    );
    builder.addCase(
      proposalListAsyncThunk.rejected.toString(),
      (state, action) => {
        state.list.loading = 'error';
      },
    );
  },
});

export default proposalSlice;
