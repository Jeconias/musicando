import {Response} from '~/config/types';
import {Event} from '../entity/event';
import APIbase from './api.base';

interface EventCreateRequest {
  title: string;
  description: string;
  valueRef: string; //TODO(Jeconias): Change to the number and refactor the backend.
  address: string;
  date: string;
}

export interface EventCreateResponse extends Response {
  data: {
    uuidEvent: string;
  };
}

const eventCreate = (data: EventCreateRequest) =>
  APIbase.post<EventCreateResponse>('/events', data);

// List

export interface EventListRequest {
  pg?: number;
}

export interface EventListResponse extends Response {
  data: {
    hasMore: boolean;
    total: number;
    data: Event[];
  };
}

const eventList = (data: EventListRequest) =>
  APIbase.get<EventListResponse>(
    `/events/search${data.pg ? `?page=${data.pg}` : ''}`,
  );

export default {
  create: eventCreate,
  list: eventList,
};
