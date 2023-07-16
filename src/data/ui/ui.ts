import { RootState } from './../../store/store';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

type downloadPending = {
  isPending: boolean;
  invoiceId: string;
};

type UiState = {
  isLoading: boolean;
  downloadPending: downloadPending;
};

const initialState: UiState = {
  isLoading: false,
  downloadPending: {
    isPending: false,
    invoiceId: '',
  },
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setDownloadPending: (
      state,
      { payload }: PayloadAction<downloadPending>,
    ) => {
      state.downloadPending = { ...payload };
    },
  },
});

const uiActions = {
  setLoading: createAction<boolean>('ui/setLoading'),
  setDownloadPending: createAction<{
    isPending: boolean;
    invoiceId: string;
  }>('ui/setDownloadPending'),
};

export { uiActions };

export const getUiIsLoading = (store: RootState) => store.ui.isLoading;
export const getUiDownloadingPending = (store: RootState) =>
  store.ui.downloadPending;

export default slice.reducer;
