import APIbase from './api.base';
import {
  ProposalCreateRequest,
  ProposalCreateResponse,
  ProposalDeleteRequest,
  ProposalDeleteResponse,
  ProposalListResponse,
} from './api.proposal.types';

const proposalCreate = (data: ProposalCreateRequest) =>
  APIbase.post<ProposalCreateResponse>('/proposal', data);

const proposalList = () =>
  APIbase.get<ProposalListResponse>('/proposal/user/received');

const proposalDelete = ({uuid}: ProposalDeleteRequest) =>
  APIbase.delete<ProposalDeleteResponse>(`/proposal/${uuid}`);

export default {
  create: proposalCreate,
  list: proposalList,
  delete: proposalDelete,
};
