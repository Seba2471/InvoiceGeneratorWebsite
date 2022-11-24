import { Store } from './authReducer';

export const login = (
  store: Store,
): {
  type: 'LOGIN';
  payload: {
    store: Store;
  };
} => ({
  type: 'LOGIN',
  payload: {
    store,
  },
});

export const logout = (): {
  type: 'LOGOUT';
} => ({
  type: 'LOGOUT',
});

export type Action = ReturnType<typeof login> | ReturnType<typeof logout>;

const actions = { login, logout };

export default actions;
