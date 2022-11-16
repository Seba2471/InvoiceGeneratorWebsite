import type { Action } from './actions';
import type { User } from '../../types/User';

export type Store = {
  user: User;
  content: string;
};

export const initialState = {
  content: 'Hello World',
  user: {
    token: 'Test',
    isAuthenticated: false,
  },
};

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      const user = action.payload.user;

      return { ...state, user };
    case 'LOGOUT':
      return { ...state, user: { token: '', isAuthenticated: false } };
    default:
      return state;
  }
};
