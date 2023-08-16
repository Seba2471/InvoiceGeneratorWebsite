import jwtDecode from 'jwt-decode';
import { ITokens } from '../types/Auth/ITokens';

const sidPropertyName =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';
const namePropertyName =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

type tokenClaims = {
  [sidPropertyName]: string;
  [namePropertyName]: string;
  exp: string;
};

const jwtServices = {
  getAccessToken: () => {
    const localStorageAuth = window.localStorage.getItem('auth-data');
    return localStorageAuth ? JSON.parse(localStorageAuth).accessToken : '';
  },
  getRefreshToken: () => {
    const localStorageAuth = window.localStorage.getItem('auth-data');
    return localStorageAuth ? JSON.parse(localStorageAuth).refreshToken : '';
  },

  getClaimsFromToken(token: string) {
    const tokenClaims: tokenClaims = jwtDecode(token);
    return {
      email: tokenClaims[namePropertyName],
      id: tokenClaims[sidPropertyName],
    };
  },

  getAuthDataFromTokens(tokens: ITokens) {
    const user = jwtServices.getClaimsFromToken(tokens.accessToken);
    const authData = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
      isAuthenticated: true,
    };

    return authData;
  },
};

export default jwtServices;
