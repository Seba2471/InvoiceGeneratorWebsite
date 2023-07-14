import { getInvoicesIsPendingSelector } from './../../data/invoices/invoices';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { InvoicesResponse } from '../../models/Invoice/InvoicesResponse';
import { PaginationResponse } from '../../models/Pagination/PaginationResponse';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUserInvoices } from '../../api/invoices/invoices';
import { PaginationRequest } from '../../models/Pagination/PaginationRequest';
import { invoicesActions } from '../../data/invoices/invoices';

function* fetchInvoices(action: PayloadAction<PaginationRequest>) {
  try {
    const { pageNumber, pageSize } = action.payload;
    const isPending: ReturnType<typeof getInvoicesIsPendingSelector> =
      yield select(getInvoicesIsPendingSelector);
    if (!isPending) {
      yield put(invoicesActions.setIsPending(true));
      const invoicesData: PaginationResponse<InvoicesResponse> = yield call(
        getUserInvoices,
        pageNumber,
        pageSize,
      );

      yield put(invoicesActions.fetchSuccess(invoicesData));
    }

    return;
  } catch (error) {
    if (typeof error === 'string') {
      yield put(invoicesActions.fetchFailure(error));
    }
  } finally {
    yield put(invoicesActions.setIsPending(false));
  }
}

export default function* invoicesSagas() {
  yield takeLatest(invoicesActions.fetch.type, fetchInvoices);
}
