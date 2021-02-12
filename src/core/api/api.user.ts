import {Response} from '~/config/types';
import {UserType} from '../entity/common';
import {Promoter, User} from '../entity/user';
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

// Read
interface UserReadRequest {
  id: string;
}

export interface UserReadResponse extends Response {
  data: Promoter;
}

const userRead = ({id}: UserReadRequest) =>
  APIbase.get<UserReadResponse>(`/user/${id}`);

// List
export interface UserListRequest {
  pg?: number;
}

export interface UserListResponse extends Response {
  data: {
    hasMore: boolean;
    total: number;
    data: User[];
  };
}

const userList = (data: UserListRequest) =>
  APIbase.get<UserListResponse>(
    `/user/search${data.pg ? `?page=${data.pg}` : ''}`,
  );

export default {
  create: userCreate,
  read: userRead,
  list: userList,
};
