import { RootState } from './../../store/store';
import { PaginationRequest } from './../../models/Pagination/PaginationRequest';
import { createSlice } from '@reduxjs/toolkit';
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { InvoicesResponse } from '../../models/Invoice/InvoicesResponse';
import { PaginationResponse } from '../../models/Pagination/PaginationResponse';

type InvoicesState = {
  data: PaginationResponse<InvoicesResponse>;
  error: null | string;
  isPending: boolean;
};

const initialState: InvoicesState = {
  data: {
    totalItemsCount: 0,
    totalPages: 0,
    itemsTo: 0,
    itemsFrom: 0,
    items: [],
  },
  error: null,
  isPending: false,
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
      state.error = payload;
    },
    setIsPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isPending = payload;
    },
  },
});

const invoicesActions = {
  fetch: createAction<PaginationRequest>('invoices/fetch'),
  fetchSuccess: createAction<PaginationResponse<InvoicesResponse>>(
    'invoices/fetchSuccess',
  ),
  fetchFailure: createAction<string>('invoices/fetchFailure'),
  setIsPending: createAction<boolean>('invoices/setIsPending'),
};

export { invoicesActions };

export const getInvoicesTotalPagesSelector = (store: RootState) =>
  store.invoices.data.totalPages;
export const getInvoicesIsPendingSelector = (store: RootState) =>
  store.invoices.isPending;

export default slice.reducer;
