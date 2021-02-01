import {UserType} from './common';
import {Event} from './event';

export interface User {
  uuid: string;
  name: string;
  nick_name?: string;
  email: string;
  photo?: string;
  tags: [];
  midias: [];
  is_premium: boolean;
  userType: UserType;
}

export interface Promoter extends User {
  events: Event[];
}

export interface Musician extends User {}
