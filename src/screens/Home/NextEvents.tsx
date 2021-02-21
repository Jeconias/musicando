import {orderBy} from 'lodash';
import React, {Fragment, useMemo} from 'react';
import {DealEntityResponse} from '~/core/api/api.deal.types';
import NextEventCard from './NextEventCard';
import WeekCalendar from './WeekCalendar';

const today = new Date();

interface NextEvents {
  deals: DealEntityResponse[] | undefined;
}

const NextEvents = ({deals}: NextEvents) => {
  const nextEventMemorized = useMemo(
    () =>
      orderBy(deals || [], (d) => d?.proposal?.event?.date, 'desc').find(
        (d) => new Date(d.proposal.event.date) >= today,
      ),
    [deals],
  );

  return (
    <Fragment>
      <WeekCalendar deal={nextEventMemorized} today={today} />
      <NextEventCard deal={nextEventMemorized} />
    </Fragment>
  );
};

export default NextEvents;
