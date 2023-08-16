import { ITokens } from './../../types/Auth/ITokens';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest } from '../../api/auth/auth';
import { authActions } from '../../data/auth/auth';
import { INewUser } from '../../models/Auth/IAuthRequest';
import { AxiosResponse } from 'axios';
import { push } from '@lagunovsky/redux-react-router';
import { uiActions } from '../../data/ui/ui';
function* login(action: PayloadAction<INewUser>) {
  try {
    yield put(uiActions.setLoading(true));
    const response: AxiosResponse = yield call(loginRequest, action.payload);
    const data: ITokens = response.data;
    yield put(authActions.authSuccess(data));
    yield put(push('/'));
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorWithMessage = error as Error;
      yield put(authActions.authFailure(errorWithMessage.message));
    }
  } finally {
    yield put(uiActions.setLoading(false));
  }
}

export default function* authSagas() {
  yield takeLatest(authActions.login, login);
}
