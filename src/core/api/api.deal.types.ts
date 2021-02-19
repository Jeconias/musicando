import {Response} from '~/config/types';
import {Deal} from '../entity/deal';
import {Event} from '../entity/event';
import {Proposal} from '../entity/proposal';
import {Musician, Promoter} from '../entity/user';

export interface DealCreateRequest {
  uuidProposal: string;
}

export interface DealCreateResponse extends Response {}

interface ProposalEntityResponse extends Pick<Proposal, 'uuid'> {
  event: Pick<
    Event,
    'date' | 'description' | 'title' | 'address' | 'valueRef' | 'hasDeal'
  >;
}

interface DealEntityResponse
  extends Omit<Deal, 'promoter' | 'musician' | 'proposal'> {
  promoter: Pick<Promoter, 'uuid' | 'photo' | 'name' | 'nickName'>;
  musician: Pick<Musician, 'uuid' | 'photo' | 'name' | 'nickName'>;
  proposal: ProposalEntityResponse;
}

export interface DealReadResponse extends Response {
  data: {
    deals: DealEntityResponse[];
  };
}
