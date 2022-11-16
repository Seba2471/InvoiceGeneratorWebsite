import { User } from '../../types/User';

export const login = (
  user: User,
): {
  type: 'LOGIN';
  payload: {
    user: User;
  };
} => ({
  type: 'LOGIN',
  payload: {
    user,
  },
});

export const logout = (): {
  type: 'LOGOUT';
} => ({
  type: 'LOGOUT',
});

export type Action = ReturnType<typeof login> | ReturnType<typeof logout>;
