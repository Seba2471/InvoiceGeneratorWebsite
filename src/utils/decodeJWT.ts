import {
  ITokenClaims,
  namePropertyName,
  sidPropertyName,
} from './../types/Auth/ITokens';
import jwtDecode from 'jwt-decode';

const decodeJWT = (token: string) => {
  const tokenClaims: ITokenClaims = jwtDecode(token);
  return {
    email: tokenClaims[namePropertyName],
    id: tokenClaims[sidPropertyName],
  };
};

export default decodeJWT;
