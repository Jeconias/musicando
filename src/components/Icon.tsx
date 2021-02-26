import React from 'react';
import {THEME} from '~/config/constants';
import {Size} from '~/config/types';
import styled, {css, useTheme} from 'styled-components';
import {normalize} from '~/utils/helpers';

import ArtistsSVG from '../assets/svgs/artists.svg';
import CalendarSVG from '../assets/svgs/calendar.svg';
import CameraSVG from '../assets/svgs/camera.svg';
import CheckSmallSVG from '../assets/svgs/check-small.svg';
import CloseSmallSVG from '../assets/svgs/close-small.svg';
import CloseSVG from '../assets/svgs/close.svg';
import CommentSVG from '../assets/svgs/comment.svg';
import DownSVG from '../assets/svgs/down.svg';
import EmailSVG from '../assets/svgs/email.svg';
import EventSimpleSVG from '../assets/svgs/event-simple.svg';
import EventSVG from '../assets/svgs/event.svg';
import FilterSVG from '../assets/svgs/filter.svg';
import GlassCupSVG from '../assets/svgs/glass-cup.svg';
import HeartFilledSVG from '../assets/svgs/heart_filled.svg';
import HeartSVG from '../assets/svgs/heart.svg';
import KeySVG from '../assets/svgs/key.svg';
import LeftSVG from '../assets/svgs/left.svg';
import LocationBigSVG from '../assets/svgs/local-two.svg';
import LocationSVG from '../assets/svgs/location.svg';
import MapSVG from '../assets/svgs/background-world.svg';
import MoneySVG from '../assets/svgs/money.svg';
import MusicSVG from '../assets/svgs/music.svg';
import PlusSVG from '../assets/svgs/plus.svg';
import RightSVG from '../assets/svgs/right.svg';
import SoundSVG from '../assets/svgs/sound.svg';
import StarSVG from '../assets/svgs/star.svg';
import SytemSVG from '../assets/svgs/system.svg';
import TicketSVG from '../assets/svgs/ticket.svg';
import UserSVG from '../assets/svgs/user.svg';
import WorldSVG from '../assets/svgs/world.svg';

const ICONS = {
  artist: ArtistsSVG,
  calendar: CalendarSVG,
  camera: CameraSVG,
  checkSmall: CheckSmallSVG,
  close: CloseSVG,
  closeSmall: CloseSmallSVG,
  comment: CommentSVG,
  down: DownSVG,
  email: EmailSVG,
  event: EventSVG,
  eventSimple: EventSimpleSVG,
  filter: FilterSVG,
  glassCup: GlassCupSVG,
  heart: HeartSVG,
  heartFilled: HeartFilledSVG,
  key: KeySVG,
  left: LeftSVG,
  location: LocationSVG,
  locationBig: LocationBigSVG,
  map: MapSVG,
  money: MoneySVG,
  music: MusicSVG,
  plus: PlusSVG,
  right: RightSVG,
  sound: SoundSVG,
  star: StarSVG,
  system: SytemSVG,
  ticket: TicketSVG,
  user: UserSVG,
  world: WorldSVG,
};

const SIZES = {
  xs: normalize(12),
  sm: normalize(16),
  md: normalize(24),
  lg: normalize(32),
  xl: normalize(40),
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
