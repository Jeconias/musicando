import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {isEmpty, merge} from 'lodash';
import {LoadingStatus} from '~/config/types';
import api from '~/core/api';
import {ProposalListResponse} from '~/core/api/api.proposal.types';
import {Proposal} from '~/core/entity/proposal';
import asyncThunk from '../utils/asyncThunk';
import {cleanAction} from './utils';

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

export const proposalDeleteAsyncThunk = asyncThunk(
  '/proposal/delete',
  api.proposal.delete,
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
  reducers: {
    updateProposal(
      state,
      action: PayloadAction<{uuid: string; proposal: Proposal}>,
    ) {
      const proposal = action.payload.proposal;

      if (
        action.payload.uuid &&
        !isEmpty(proposal) &&
        typeof proposal === 'object' &&
        !Array.isArray(proposal)
      ) {
        const currentProposal =
          state.list.response?.find((p) => p.uuid === action.payload.uuid) ||
          {};

        state.list.response = [
          ...(state.list.response?.filter(
            (p) => p.uuid !== action.payload.uuid,
          ) || []),
          merge(currentProposal, proposal),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cleanAction.toString(), (state) => {
      state.list.response = undefined;
      state.list = {
        loading: 'idle',
      };
    });

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
export const {updateProposal} = proposalSlice.actions;
export default proposalSlice;
