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
}

export enum AuthStackScreens {
  Home = 'AuthStack:Home',
  Opportunities = 'AuthStack:Opportunities',
  Configs = 'AuthStack:Configs',
}

export type Response = {
  status: boolean;
  message: string;
};

export type RequestError<T = any> = AxiosError<T>;
