import { rootReducer } from './../data/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sideeffects/rootSaga';
import { createBrowserHistory } from 'history';
import {
  createRouterMiddleware,
  ReduxRouterSelector,
} from '@lagunovsky/redux-react-router';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const store = configureStore({
  reducer: rootReducer,
  middleware: [routerMiddleware, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export const routerSelector: ReduxRouterSelector<RootState> = (state) =>
  state.navigator;
export default store;
