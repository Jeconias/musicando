import {Response} from '~/config/types';
import {UserType} from '../entity/common';
import {Promoter} from '../entity/user';
import APIbase from './api.base';

interface UserCreateRequest {
  name: string;
  nickName: string;
  email: string;
  password: string;
  birthdate: string;
  phoneNumber: string;
  description: string;
  userType: UserType;
}

interface UserCreateResponse extends Response {}

const userCreate = (data: UserCreateRequest) =>
  APIbase.post<UserCreateResponse>('/user', data);

interface UserReadRequest {
  id: string;
}

export interface UserReadResponse extends Response {
  data: Promoter;
}

const userRead = ({id}: UserReadRequest) =>
  APIbase.get<UserReadResponse>(`/user/${id}`);

export default {
  create: userCreate,
  read: userRead,
};
