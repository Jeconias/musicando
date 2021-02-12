export interface Event {
  uuid: string;
  title: string;
  description: string;
  /** @deprecated */
  value_ref?: number;
  valueRef?: number;
  cover?: string;
  tags: [];
  proposals: [];
  midias: [];
  address: string;
  junk: boolean;
  date: string;
  created: string;
}
