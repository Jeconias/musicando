import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {RequestError} from '~/config/types';
import {RootState} from '..';

interface AsyncThunkOptions<T> {
  condition?: (
    req: T,
    state: {getState: () => RootState; extra: any},
  ) => boolean | undefined;
}

const asyncThunk = <Req, Res, ErrorResParams = {}>(
  typePrefix: string,
  request: (data: Req) => Promise<AxiosResponse<Res>>,
  options?: AsyncThunkOptions<Req>,
) => {
  return createAsyncThunk<Res, Req>(
    typePrefix,
    async (requestData: Req, {rejectWithValue}) => {
      try {
        const response = await request(requestData);
        return {...response?.data} as Res;
      } catch (err) {
        if (err.response) {
          return rejectWithValue(
            err?.response?.data as RequestError<ErrorResParams>,
          );
        } else {
          return rejectWithValue({
            message: err?.message,
            isAxiosError: err?.isAxiosError,
          });
        }
      }
    },
    {
      condition: options?.condition,
    },
  );
};

export default asyncThunk;
