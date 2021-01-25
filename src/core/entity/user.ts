import {UserType} from './common';

export interface User {
  uuid: string;
  name: string;
  email: string;
  userType: UserType;
}
