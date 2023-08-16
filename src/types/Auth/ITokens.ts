export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export const sidPropertyName =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';
export const namePropertyName =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

export interface ITokenClaims {
  [sidPropertyName]: string;
  [namePropertyName]: string;
  exp: string;
}
