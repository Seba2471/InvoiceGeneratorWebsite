const jwtServices = {
  getAccessToken: () => {
    const localStorageAuth = window.localStorage.getItem('auth-data');
    return localStorageAuth ? JSON.parse(localStorageAuth).accessToken : '';
  },
};

export default jwtServices;
