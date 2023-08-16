import { IAuthRegisterRequest } from '../../models/Auth/IAuthRegisterRequest';
import { IAuthRequest } from '../../models/Auth/IAuthRequest';
import apiRequest from '../../utils/apiRequest';
export async function loginRequest(userData: IAuthRequest) {
  try {
    const response = apiRequest.post('auth/login', userData);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function registerRequest(userData: IAuthRegisterRequest) {
  try {
    const response = apiRequest.post('auth/register', userData);
    return response;
  } catch (error) {
    throw error;
  }
}
