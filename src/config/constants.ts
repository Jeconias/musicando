import Config from 'react-native-config';
import {Dimensions} from 'react-native';
import {normalize} from '~/utils/helpers';

const deviceDimensions = Dimensions.get('window');

export const THEME = {
  colors: {
    primary: '#F08700',
    secondary: '???',

    //Text
    title: '#fff',
    text: '#8C8C8C',

    //StatusBar
    statusBar: '#1B202C',

    //Backgrounds
    backgroundBlack: '#1B202C',
    backgroundBlackSupport: '#313640',
    backgroundBlackOpacity: '#222732',

    //Support
    white: '#fff',
    feedbackError: '#e63946',
    feedbackSuccess: '#2c6e49',
    feedbackSupport: '#386fa4',
  },
  fontSize: {
    xxs: `${normalize(12)}px`,
    xs: `${normalize(14)}px`,
    sm: `${normalize(18)}px`,
    md: `${normalize(24)}px`,
    lg: `${normalize(32)}px`,
    xlg: `${normalize(40)}px`,
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xlg: '40px',
  },
  device: {
    dimensions: {
      window: {
        width: Math.ceil(deviceDimensions.width),
        height: Math.ceil(deviceDimensions.height),
      },
    },
  },
};

export const STORAGE_PREFIX = '@MS';

export const TOKEN_STORAGE_KEY = `${STORAGE_PREFIX}:token`;

export const ENVIRONMENT = {
  api: Config.API_URL,
  isDev: Config.ENVIRONMENT === 'development',
  isHom: Config.ENVIRONMENT === 'homologation',
  isProd: Config.ENVIRONMENT === 'production',
  firebase: {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_AUTH_DOMAIN,
    projectId: Config.FIREBASE_PROJECT_ID,
    storageBucket: Config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Config.FIREBASE_MESSAGING_SEND_ID,
    appId: Config.FIREBASE_APP_ID,
    measurementId: Config.FIREBASE_MEASUREMENT_ID,
  },
};
