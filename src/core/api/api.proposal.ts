import {Response} from '~/config/types';
import APIbase from './api.base';

interface ProposalCreateRequest {
  uuidEvent: string;
  value: string;
  description: string;
}

interface ProposalCreateResponse extends Response {}

const proposalCreate = (data: ProposalCreateRequest) =>
  APIbase.post<ProposalCreateResponse>('/proposal', data);

export default {
  create: proposalCreate,
};
