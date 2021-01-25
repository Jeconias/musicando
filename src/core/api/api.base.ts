import {ENVIRONMENT, TOKEN_STORAGE_KEY} from '~/config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const APIbase = axios.create({
  baseURL: ENVIRONMENT.api,
  headers: {
    Accept: 'application/json',
  },
});

APIbase.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default APIbase;
