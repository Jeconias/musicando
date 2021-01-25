import {ptBR} from 'date-fns/locale';
import {format as DateFormat} from 'date-fns';
import {merge} from 'lodash';

const getCurrentFormat = () => '';

const getDefaultOptions = () => ({
  locale: ptBR,
});

export const format = (
  date: number | Date,
  format?: string,
  options?: Object,
) =>
  DateFormat(
    date,
    format ?? getCurrentFormat(),
    merge(options, getDefaultOptions()),
  );
