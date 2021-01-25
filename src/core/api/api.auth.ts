import {Response} from '~/config/types';
import {User} from '../entity/user';
import APIbase from './api.base';

interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse extends Response {
  data: {
    token: string;
    user: User;
  };
}

export const authentication = (data: AuthenticationRequest) =>
  APIbase.post<AuthenticationResponse>('/auth', data);
