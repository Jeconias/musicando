import {Event} from './event';
import {User} from './user';

export enum ProposalState {
  AWAITING = 'AWAITING',
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
}

export interface Proposal {
  uuid: string;
  value: string;
  event: Event;
  from: Pick<User, 'uuid' | 'name' | 'nickName' | 'photo'>;
  description: string;
  state: ProposalState;
  created: string;
}
