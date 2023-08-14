import { PaginationResponse } from './../../models/Pagination/PaginationResponse';
import { DeleteInvoiceRequest } from './../../models/Invoice/DeleteInvoiceRequest';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { InvoicesResponse } from '../../models/Invoice/InvoicesResponse';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteInvoiceRequest,
  getUserInvoicesRequest,
  downloadInvoiceRequest,
  createNewInvoiceRequest,
} from '../../api/invoices/invoices';
import { PaginationRequest } from '../../models/Pagination/PaginationRequest';
import { invoicesActions } from '../../data/invoices/invoices';
import { uiActions } from '../../data/ui/ui';
import { downloadBlobFile } from '../../utils/downloadBlobFile';
import { DownloadInvoiceRequest } from '../../models/Invoice/DownloadInvoiceRequest';
import successNotify from '../../helpers/notify/successNotify';
import errorNotify from '../../helpers/notify/errorNotify';
import { NewInvoice } from '../../models/Invoice/NewInvoice';

function* createInvoice(action: PayloadAction<NewInvoice>) {
  try {
    yield put(invoicesActions.clearErrors());
    yield put(uiActions.setLoading(true));
    yield call(createNewInvoiceRequest, action.payload);
    successNotify('Faktura została wygenerowana');
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorWithMessage = error as Error;
      yield put(invoicesActions.fetchFailure(errorWithMessage.message));
      errorNotify('Nie udało się wygenerować faktury');
    } else {
      yield put(invoicesActions.fetchFailure('An error occurred.'));
      errorNotify('Nie udało się wygenerować faktury');
    }
  } finally {
    yield put(uiActions.setLoading(false));
  }
}

function* fetchInvoices(action: PayloadAction<PaginationRequest>) {
  try {
    yield put(invoicesActions.clearErrors());
    const { pageNumber, pageSize } = action.payload;
    yield put(uiActions.setLoading(true));
    const invoicesData: PaginationResponse<InvoicesResponse> = yield call(
      getUserInvoicesRequest,
      pageNumber,
      pageSize,
    );
    if (invoicesData.totalPages < pageNumber) {
      const invoicesData: PaginationResponse<InvoicesResponse> = yield call(
        getUserInvoicesRequest,
        1,
        pageSize,
      );
      yield put(invoicesActions.fetchSuccess(invoicesData));
    } else {
      yield put(invoicesActions.fetchSuccess(invoicesData));
    }
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorWithMessage = error as Error;
      yield put(invoicesActions.fetchFailure(errorWithMessage.message));
    } else {
      yield put(invoicesActions.fetchFailure('An error occurred.'));
    }
  } finally {
    yield put(uiActions.setLoading(false));
  }
}

function* deleteUserInvoice(action: PayloadAction<DeleteInvoiceRequest>) {
  try {
    yield put(invoicesActions.clearErrors());
    const { invoiceId, pageNumber, pageSize } = action.payload;
    yield call(deleteInvoiceRequest, invoiceId);
    yield put(
      invoicesActions.fetch({ pageNumber: pageNumber, pageSize: pageSize }),
    );
    successNotify('Faktura została usunięta!');
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorWithMessage = error as Error;
      yield put(invoicesActions.fetchFailure(errorWithMessage.message));
      errorNotify('Nie udało się usunąć faktury!');
    } else {
      yield put(invoicesActions.fetchFailure('An error occurred.'));
      errorNotify('Nie udało się usunąć faktury!');
    }
  }
}

function* downoladInvoice(action: PayloadAction<DownloadInvoiceRequest>) {
  try {
    yield put(invoicesActions.clearErrors());
    const { invoiceId, invoiceNumber } = action.payload;
    yield put(
      uiActions.setDownloadPending({ isPending: true, invoiceId: invoiceId }),
    );
    const data: { data: Blob; success: boolean } = yield call(
      downloadInvoiceRequest,
      invoiceId,
    );
    downloadBlobFile(data.data, invoiceNumber);
    successNotify('Faktura została pobrana!');
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorWithMessage = error as Error;
      yield put(invoicesActions.fetchFailure(errorWithMessage.message));
      errorNotify('Nie udało się pobrać faktury!');
    } else {
      yield put(invoicesActions.fetchFailure('An error occurred'));
      errorNotify('Nie udało się pobrać faktury!');
    }
  } finally {
    yield put(
      uiActions.setDownloadPending({ isPending: false, invoiceId: '' }),
    ); // Użyj efektu put, aby wysłać akcję
  }
}

export default function* invoicesSagas() {
  yield takeLatest(invoicesActions.fetch.type, fetchInvoices);
  yield takeLatest(invoicesActions.create, createInvoice);
  yield takeLatest(invoicesActions.delete.type, deleteUserInvoice);
  yield takeLatest(invoicesActions.download.type, downoladInvoice);
}
