import Config from 'react-native-config';
import {Dimensions} from 'react-native';

const deviceDimensions = Dimensions.get('window');

export const THEME = {
  colors: {
    primary: '#F08700',

    //Text
    title: '#fff',
    text: '#8C8C8C',

    //Backgrounds
    backgroundBlack: '#1B202C',
    backgroundBlackSupport: '#313640',
    backgroundOpacity: '#222732',

    //Support
    white: '#fff',
    feedbackError: '#e63946',
    feedbackSuccess: '#2c6e49',
    feedbackSupport: '#386fa4',
  },
  fontSize: {
    xxs: '11px',
    xs: '13px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xlg: '40px',
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
};
