import {capitalize} from 'lodash';

export const capitalizeByIndex = (str: string, index: number) => {
  const s = str.split('');
  if (index < 0 || index > s.length - 1) return str;
  s[index] = capitalize(s[index]);
  return s.join('');
};

export const uriToBlob = async (uri?: string) =>
  (await fetch(uri ?? '')).blob();
