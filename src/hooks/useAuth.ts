import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import { Tokens } from '../types/Auth/Tokens';
import authActions from '../store/auth/actions';
import { getClaimsFromToken } from '../helpers/getClaims';

export default function useAuth() {
  const authContext = useContext(AuthContext);

  const setAuth = {
    login: (tokens: Tokens) => {
      const user = getClaimsFromToken(tokens.accessToken);

      const authData = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
        isAuthenticated: true,
      };

      authContext.dispatch(authActions.login(authData));
      window.localStorage.setItem('auth-data', JSON.stringify(authData));
    },
    logout: () => {
      authContext.dispatch(authActions.logout());
      window.localStorage.removeItem('auth-data');
    },
  };

  return [authContext.state, setAuth] as const;
}
