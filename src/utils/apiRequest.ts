import axios from 'axios';
import jwtServices from '../services/jwtService';

const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//Configure Bearer token in request headers
apiRequest.interceptors.request.use((config) => {
  const token = jwtServices.getAccessToken();
  if (token) {
    config.headers!.authorization = 'Bearer ' + jwtServices.getAccessToken();
  }
  return config;
});

//Refresh token if token is expired
apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await apiRequest.post('Auth/refresh', {
        token: jwtServices.getRefreshToken(),
      });

      if (result?.data.accessToken) {
        const authData = jwtServices.getAuthDataFromTokens(result.data);
        window.localStorage.setItem('auth-data', JSON.stringify(authData));
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.data.accessToken}`,
        };
      }

      return apiRequest(config);
    }
    return Promise.reject(error);
  },
);

export default apiRequest;
