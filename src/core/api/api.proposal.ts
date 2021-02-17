import {Response} from '~/config/types';
import {Proposal} from '../entity/proposal';
import APIbase from './api.base';

interface ProposalCreateRequest {
  uuidEvent: string;
  value: string;
  description: string;
}

interface ProposalCreateResponse extends Response {}

const proposalCreate = (data: ProposalCreateRequest) =>
  APIbase.post<ProposalCreateResponse>('/proposal', data);

export interface ProposalListResponse extends Response {
  data: {
    proposals: Proposal[];
  };
}

const proposalList = () =>
  APIbase.get<ProposalListResponse>('/proposal/user/received');

export default {
  create: proposalCreate,
  list: proposalList,
};
