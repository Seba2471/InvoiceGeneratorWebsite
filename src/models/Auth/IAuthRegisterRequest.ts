import { IAuthRequest } from './IAuthRequest';
export interface IAuthRegisterRequest extends IAuthRequest {
  confirmPassword: string;
}
