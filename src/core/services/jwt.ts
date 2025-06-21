const tokenKey: string = 'token';
const refreshTokenKey: string = 'refresh';

//Set Token
const setToken = function (token: string): void {
  window.localStorage.setItem(tokenKey, token);
};

//Set Refresh Token
const setRefreshToken = function (refresh: string): void {
  window.localStorage.setItem(refreshTokenKey, refresh);
};

//Get Token
const getToken = function (): string | null {
  const token = window.localStorage.getItem(tokenKey);
  return token;
};

//Get Refresh Token
const getRefreshToken = function (): string | null {
  const refreshToken = window.localStorage.getItem(refreshTokenKey);
  return refreshToken;
};

//Destroy Token
const destroyToken = function (): void {
  window.localStorage.removeItem(tokenKey);
  window.localStorage.removeItem(refreshTokenKey);
};

const jwtServices = {
  setToken,
  setRefreshToken,
  getToken,
  getRefreshToken,
  destroyToken,
};

export default jwtServices;
