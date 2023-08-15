import { IInvoice } from '../../types/Invoice/IInvoice';
import { DeleteInvoiceRequest } from '../../models/Invoice/Requests/DeleteInvoiceRequest';
import { RootState } from './../../store/store';
import { PaginationRequest } from './../../models/Pagination/PaginationRequest';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { InvoicesResponse } from '../../models/Invoice/Response/InvoicesResponse';
import { PaginationResponse } from '../../models/Pagination/PaginationResponse';
import { DownloadInvoiceRequest } from '../../models/Invoice/Requests/DownloadInvoiceRequest';

type InvoicesState = {
  data: PaginationResponse<InvoicesResponse>;
  error: { show: boolean; message: string };
  successDownload: boolean;
};

const initialState: InvoicesState = {
  data: {
    totalItemsCount: 0,
    totalPages: 0,
    itemsTo: 0,
    itemsFrom: 0,
    items: [],
  },
  error: {
    show: false,
    message: '',
  },
  successDownload: false,
};

const slice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    fetchSuccess: (
      state,
      { payload }: PayloadAction<PaginationResponse<InvoicesResponse>>,
    ) => {
      state.data = { ...payload };
    },
    fetchFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = { show: true, message: payload };
    },
    clearErrors: (state) => {
      state.error = { show: false, message: '' };
    },
    setDownloadSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.successDownload = payload;
    },
  },
});

const invoicesActions = {
  fetch: createAction<PaginationRequest>('invoices/fetch'),
  fetchSuccess: createAction<PaginationResponse<InvoicesResponse>>(
    'invoices/fetchSuccess',
  ),
  fetchFailure: createAction<string>('invoices/fetchFailure'),
  clearErrors: createAction('invoices/clearErrors'),
  create: createAction<IInvoice>('invoice/create'),
  download: createAction<DownloadInvoiceRequest>('invoice/downolad'),
  setDownloadSuccess: createAction<boolean>('invoice/download'),
  delete: createAction<DeleteInvoiceRequest>('invoices/delete'),
};

export { invoicesActions };

export const getInvoicesDataSelector = (store: RootState) =>
  store.invoices.data;
export const getInvoicesErrorSelector = (store: RootState) =>
  store.invoices.error;
export const getInvoiceDownloadStatus = (store: RootState) =>
  store.invoices.successDownload;

export default slice.reducer;
