import { all, fork } from 'redux-saga/effects';

import invoicesSagas from './invoices/invoices';

const combinedSagas = [fork(invoicesSagas)];

export default function* rootSaga() {
  yield all(combinedSagas);
}
