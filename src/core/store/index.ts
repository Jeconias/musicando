import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import ReportError from '../middlewares/ReportError';
import eventSlice from './actions/event';
import feedbackSlice from './actions/feedback';
import userSlice from './actions/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  event: eventSlice.reducer,
  feedback: feedbackSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: () => getDefaultMiddleware().concat(ReportError),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
