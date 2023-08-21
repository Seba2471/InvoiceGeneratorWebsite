import { IAuthRegisterRequest } from './../../models/Auth/IAuthRegisterRequest';
import { ITokens } from './../../types/Auth/ITokens';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, registerRequest } from '../../api/auth/auth';
import { authActions } from '../../data/auth/auth';
import { IAuthRequest } from '../../models/Auth/IAuthRequest';
import { AxiosResponse, AxiosError } from 'axios';
import { push } from '@lagunovsky/redux-react-router';
import { uiActions } from '../../data/ui/ui';
import { IBackendErrorResponse } from '../../types/Responses/IBackendErrorResponse';
function* login(action: PayloadAction<IAuthRequest>) {
  try {
    yield put(authActions.clearErrors());
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
function* register(action: PayloadAction<IAuthRegisterRequest>) {
  try {
    yield put(authActions.clearErrors());
    yield put(uiActions.setLoading(true));
    const response: AxiosResponse = yield call(registerRequest, action.payload);
    console.log(response);
    const data: ITokens = response.data;
    yield put(authActions.authSuccess(data));
    yield put(push(`/confirm-email/${action.payload.email}`));
  } catch (error: unknown) {
    // if (typeof error === 'object' && error !== null && 'message' in error) {
    //   const errorWithMessage = error as Error;
    //   yield put(authActions.authFailure(errorWithMessage.message));
    // }
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as AxiosError<IBackendErrorResponse>;
      const backendErrors = axiosError.response?.data.errors;

      if (backendErrors) {
        if (backendErrors['DuplicateEmail']) {
          yield put(authActions.authFailure('Taki użytkownik już istnieje!'));
        }
        // Możesz dalej obsługiwać błędy z backendu
        // Na przykład, możesz wyciągać wiadomości o błędach i wyświetlać użytkownikowi
      }
    } else {
      yield put(authActions.authFailure());
    }
  } finally {
    yield put(uiActions.setLoading(false));
  }
}

export default function* authSagas() {
  yield takeLatest(authActions.login, login);
  yield takeLatest(authActions.register, register);
}
