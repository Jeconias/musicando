export interface Event {
  uuid: string;
  title: string;
  description: string;
  value_ref: number;
  cover?: string;
  tags: [];
  proposals: [];
  midias: [];
  address: string;
  junk: boolean;
  date: string;
  created: string;
}
