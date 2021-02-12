import {UserType} from './common';
import {Event} from './event';

export interface User {
  uuid: string;
  name: string;
  /**@deprecated */
  nick_name?: string;
  nickName?: string;
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
