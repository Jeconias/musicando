import {Response} from '~/config/types';
import {Proposal} from '../entity/proposal';

export interface ProposalCreateRequest {
  uuidEvent: string;
  value: string;
  description: string;
}

export interface ProposalCreateResponse extends Response {}

export interface ProposalListResponse extends Response {
  data: {
    proposals: Proposal[];
  };
}

export interface ProposalDeleteRequest {
  uuid: string;
}

export interface ProposalDeleteResponse extends Response {}
