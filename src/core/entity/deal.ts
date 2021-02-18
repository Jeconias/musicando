import {Proposal} from './proposal';
import {Musician, Promoter} from './user';

export enum DealState {
  WAITING = 'WAITING',
  IMMUTABLE = 'IMMUTABLE',
  FINISHED = 'FINISHED',
  WAITING_EVALUATION = 'WAITING_EVALUATION',
  RATED = 'RATED',
  CANCELED = 'CANCELED',
}

export interface Deal {
  uuid: string;
  promoter: Promoter;
  musician: Musician;
  proposal: Proposal;
  created: string;
  state: DealState;
}
