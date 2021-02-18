import APIbase from './api.base';
import {
  DealCreateRequest,
  DealCreateResponse,
  DealReadResponse,
} from './api.deal.types';

const dealList = (data: DealCreateRequest) =>
  APIbase.post<DealCreateResponse>('/deal', data);

const dealRead = () => APIbase.get<DealReadResponse>('/deal');

export default {
  create: dealList,
  read: dealRead,
};
