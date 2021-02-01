import {PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from 'react';
import {AnyAction, MiddlewareAPI} from 'redux';
import {feedbackAction} from '../store/actions/feedback';

const ReportError = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (
  action: PayloadAction<any>,
) => {
  if (
    action.type.endsWith('rejected') &&
    !store.getState()?.feedback?.message
  ) {
    const message =
      action.payload?.message ?? 'Ops! Tivemos um error inesperado.';
    store.dispatch(feedbackAction({type: 'danger', message}));
  }

  return next(action);
};

export default ReportError;
