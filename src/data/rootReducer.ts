import { combineReducers } from 'redux';

import invoiceReducer from './invoices/invoices';

export const rootReducer = combineReducers({
  invoices: invoiceReducer,
});
