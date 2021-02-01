import {Response} from '~/config/types';
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

export default {
  create: eventCreate,
};
