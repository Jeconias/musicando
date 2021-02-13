import {AxiosError} from 'axios';
import {THEME} from './constants';

export interface ComponentWithChildrenInterface<T = React.ReactNode> {
  children: T | T[];
}

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg';

export type Color = keyof typeof THEME.colors;

export type LoadingStatus = 'idle' | 'loading' | 'ok' | 'error';

// Routes

export enum RootStackScreens {
  AppStack = 'AppStack',
  AuthStack = 'AuthStack',
  DrawerStack = 'DrawerStack',
  ModalRegister = 'ModalRegister',
  ModalTerms = 'ModalTerms',
}

export enum AppStackScreens {
  WelcomeLocation = 'AppStack:WelcomeLocation',
  WelcomeArtist = 'AppStack:WelcomeArtist',
  WelcomeNetworking = 'AppStack:WelcomeNetworking',
  Login = 'AppStack:Login',
  Opportunities = 'AppStack:Opportunities',
  UserProfile = 'AppStack:UserProfile',
  EventDetails = 'AppStack:EventDetails',
}

export enum AuthStackScreens {
  Home = 'AuthStack:Home',
  Opportunities = 'AuthStack:Opportunities',
  Configs = 'AuthStack:Configs',
}

export enum DrawerStackScreens {
  Home = 'DrawerStack:Home',
  Event = 'DrawerStack:Event',
}

export enum EventStackScreens {
  List = 'Event:List',
  Create = 'Event:Create',
}

export type Response = {
  status: boolean;
  message?: string;
};

export type RequestError<T = Response> = AxiosError<T>;

export interface RouteParams<T> {
  route: {
    key: string;
    name: string;
    params: T | undefined;
  };
}
