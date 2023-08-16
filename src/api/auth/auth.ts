import { INewUser } from '../../models/Auth/IAuthRequest';
import apiRequest from '../../utils/apiRequest';
export async function loginRequest(userData: INewUser) {
  try {
    const response = apiRequest.post('auth/login', userData);
    return response;
  } catch (error) {
    throw error;
  }
}
