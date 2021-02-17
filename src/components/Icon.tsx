import React from 'react';
import {THEME} from '~/config/constants';
import {Size} from '~/config/types';
import styled, {css, useTheme} from 'styled-components';

import MapSVG from '../assets/svgs/background-world.svg';
import WorldSVG from '../assets/svgs/world.svg';
import LocationSVG from '../assets/svgs/location.svg';
import CheckSmallSVG from '../assets/svgs/check-small.svg';
import CloseSmallSVG from '../assets/svgs/close-small.svg';
import LocationBigSVG from '../assets/svgs/local-two.svg';
import ArrowRightSVG from '../assets/svgs/right.svg';
import ArrowLeftSVG from '../assets/svgs/left.svg';
import CloseSVG from '../assets/svgs/close.svg';
import HeartSVG from '../assets/svgs/heart.svg';
import HeartFilledSVG from '../assets/svgs/heart_filled.svg';
import FilterSVG from '../assets/svgs/filter.svg';
import ArtistsSVG from '../assets/svgs/artists.svg';
import SoundSVG from '../assets/svgs/sound.svg';
import UserSVG from '../assets/svgs/user.svg';
import KeySVG from '../assets/svgs/key.svg';
import CalendarSVG from '../assets/svgs/calendar.svg';
import EmailSVG from '../assets/svgs/email.svg';
import MusicSVG from '../assets/svgs/music.svg';
import EventSVG from '../assets/svgs/event.svg';
import StarSVG from '../assets/svgs/star.svg';
import MoneySVG from '../assets/svgs/money.svg';
import SytemSVG from '../assets/svgs/system.svg';
import TicketSVG from '../assets/svgs/ticket.svg';
import EventSimpleSVG from '../assets/svgs/event-simple.svg';
import GlassCupSVG from '../assets/svgs/glass-cup.svg';
import PlusSVG from '../assets/svgs/plus.svg';
import CommentSVG from '../assets/svgs/comment.svg';
import CameraSVG from '../assets/svgs/camera.svg';

const ICONS = {
  map: MapSVG,
  location: LocationSVG,
  locationBig: LocationBigSVG,
  arrowRight: ArrowRightSVG,
  arrowLeft: ArrowLeftSVG,
  close: CloseSVG,
  heart: HeartSVG,
  heartFilled: HeartFilledSVG,
  filter: FilterSVG,
  artist: ArtistsSVG,
  sound: SoundSVG,
  user: UserSVG,
  key: KeySVG,
  calendar: CalendarSVG,
  email: EmailSVG,
  music: MusicSVG,
  event: EventSVG,
  star: StarSVG,
  money: MoneySVG,
  world: WorldSVG,
  system: SytemSVG,
  ticket: TicketSVG,
  eventSimple: EventSimpleSVG,
  glassCup: GlassCupSVG,
  plus: PlusSVG,
  comment: CommentSVG,
  camera: CameraSVG,
  checkSmall: CheckSmallSVG,
  closeSmall: CloseSmallSVG,
};

const SIZES = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

export type IconType = keyof typeof ICONS;

interface IconInterface {
  icon: IconType;
  color?: keyof typeof THEME.colors;
  withTheme?: boolean;
  size?: keyof typeof SIZES;
  marginRight?: Size;
}

const Icon = ({icon, size, color, ...props}: IconInterface) => {
  const theme = useTheme();

  const cProps: {[k: string]: any} = size
    ? {width: SIZES[size], height: SIZES[size]}
    : {};
  cProps.color = color ? theme.colors[color] : '#fff';

  const tag = ICONS[icon];
  return <IconStyled {...props} {...cProps} tag={tag} />;
};

export default Icon;

const IconStyled = styled(({tag: Tag, ...props}) => <Tag {...props} />)`
  ${({theme, marginRight}) => css`
    ${marginRight &&
    css`
      margin-right: ${theme.spacing[marginRight]};
    `}
  `}
`;
