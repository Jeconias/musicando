import {
  createAction,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {FeedbackType} from '~/providers/FeedbackProvider';

type FeedbackData = {
  type?: FeedbackType;
  message?: string;
};

interface FeedbackSliceInterface {
  data: FeedbackData;
}

export const feedbackAction = createAction(
  'feedback/update',
  (data: FeedbackData) => ({payload: data}),
);

const feedbackSlice = createSlice<
  FeedbackSliceInterface,
  SliceCaseReducers<FeedbackSliceInterface>
>({
  name: 'feedback',
  initialState: {
    data: {
      type: 'info',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<string, PayloadAction<FeedbackData>>(
      feedbackAction.toString(),
      (state, action) => {
        state.data = action.payload;
      },
    );
  },
});

export default feedbackSlice;
