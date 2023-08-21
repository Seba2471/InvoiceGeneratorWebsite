import { all, fork } from 'redux-saga/effects';
import authSagas from './auth/auth';

import invoicesSagas from './invoices/invoices';

const combinedSagas = [fork(invoicesSagas), fork(authSagas)];

export default function* rootSaga() {
  yield all(combinedSagas);
}
