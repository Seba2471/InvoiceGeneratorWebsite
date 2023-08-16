import { RootState } from './../../store/store';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { INewUser } from '../../models/Auth/IAuthRequest';
import { ITokens } from '../../types/Auth/ITokens';
import { IUser } from '../../types/Auth/IUser';
import decodeJWT from '../../utils/decodeJWT';
type AuthState = {
  tokens: ITokens;
  user: IUser;
  error: string;
};

const initialState: AuthState = {
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  user: {
    email: '',
    id: '',
    isAuthenticated: false,
  },
  error: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, { payload }: PayloadAction<ITokens>) => {
      state.tokens = payload;
      const decodedToken = decodeJWT(state.tokens.accessToken);
      state.user = { ...decodedToken, isAuthenticated: true };
    },
    authFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

const authActions = {
  login: createAction<INewUser>('auth/login'),
  authSuccess: createAction<ITokens>('auth/authSuccess'),
  authFailure: createAction<string>('auth/authFailure'),
  logout: createAction('auth/logout'),
};

export { authActions };

export const getIsAuthenticatedSelector = (store: RootState) =>
  store.auth.user.isAuthenticated;
export const getUserSelector = (store: RootState) => store.auth.user;

export default slice.reducer;
