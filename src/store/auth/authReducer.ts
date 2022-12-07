import type { Action } from './actions';
import type { User } from '../../types/Auth/User';

export type Store = {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

const localStorageUser = window.localStorage.getItem('auth-data');
export const initialState = localStorageUser
  ? { ...JSON.parse(localStorageUser) }
  : {
      user: {
        email: '',
        id: '',
      },
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      const accessToken = action.payload.store.accessToken;
      const refreshToken = action.payload.store.refreshToken;
      const user = action.payload.store.user;
      const isAuthenticated = true;

      return { ...state, user, accessToken, refreshToken, isAuthenticated };
    case 'LOGOUT':
      return {
        ...state,
        user: { id: '', email: '' },
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
