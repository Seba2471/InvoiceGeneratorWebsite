import { combineReducers } from 'redux';

import invoiceReducer from './invoices/invoices';
import uiReducer from './ui/ui';

export const rootReducer = combineReducers({
  invoices: invoiceReducer,
  ui: uiReducer,
});
