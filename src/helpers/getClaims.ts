import jwtDecode from 'jwt-decode';

const sidPropertyName =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';
const namePropertyName =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

type tokenClaims = {
  [sidPropertyName]: string;
  [namePropertyName]: string;
  exp: string;
};

export const getClaimsFromToken = (token: string) => {
  const tokenClaims: tokenClaims = jwtDecode(token);
  return {
    email: tokenClaims[namePropertyName],
    id: tokenClaims[sidPropertyName],
  };
};
