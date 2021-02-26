import APIbase from './api.base';
import {
  DealCreateRequest,
  DealCreateResponse,
  DealDeleteRequest,
  DealDeleteResponse,
  DealReadResponse,
} from './api.deal.types';

const dealList = (data: DealCreateRequest) =>
  APIbase.post<DealCreateResponse>('/deal', data);

const dealRead = () => APIbase.get<DealReadResponse>('/deal');

const dealDelete = ({uuid}: DealDeleteRequest) =>
  APIbase.delete<DealDeleteResponse>(`/deal/${uuid}`);

export default {
  create: dealList,
  read: dealRead,
  delete: dealDelete,
};
