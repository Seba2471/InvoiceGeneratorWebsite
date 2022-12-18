import axios from 'axios';
import jwtServices from './services/jwtService';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const axiosAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosAuthInstance.interceptors.request.use((config) => {
  const token = jwtServices.getAccessToken();
  if (token) {
    config.headers!.authorization = 'Bearer ' + jwtServices.getAccessToken();
  }
  return config;
});

// axiosAuthInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.name !== 'CanceledError') {
//       if (error.response.status) {
//         if (
//           error.response.status === 401 &&
//           error.response.headers['token-expired'] === 'true'
//         ) {
//           if (jwtServices.getAccessToken()) {
//             try {
//               const newTokens = await axiosInstance.post('Auth/refresh', {
//                 token: jwtServices.getRefreshToken(),
//               });
//               const authData = jwtServices.getAuthDataFromTokens(
//                 newTokens.data,
//               );
//               window.localStorage.setItem(
//                 'auth-data',
//                 JSON.stringify(authData),
//               );
//               originalRequest.headers!.authorization =
//                 'Bearer ' + newTokens.data.accessToken;
//               return axiosAuthInstance(originalRequest);
//             } catch (e) {
//               window.localStorage.removeItem('auth-data');
//               return Promise.reject(error);
//             }
//           }
//         }
//       }
//     }

//     return Promise.reject(error);
//   },
// );

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await axiosInstance.post('Auth/refresh', {
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

      return axiosAuthInstance(config);
    }
    return Promise.reject(error);
  },
);
