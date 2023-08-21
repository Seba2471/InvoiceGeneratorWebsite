import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import invoiceReducer from './invoices/invoices';
import uiReducer from './ui/ui';
import authReducer from './auth/auth';
import persistReducer from 'redux-persist/es/persistReducer';
import { createBrowserHistory } from 'history';
import { createRouterReducer } from '@lagunovsky/redux-react-router';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
};

const history = createBrowserHistory();

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  invoices: invoiceReducer,
  ui: uiReducer,
  navigator: createRouterReducer(history),
});
