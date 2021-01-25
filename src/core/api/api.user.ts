import {Response} from '~/config/types';
import {UserType} from '../entity/common';
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

export default {
  create: userCreate,
};
