import axios from 'axios';
import { authAPI } from '../endpoints/auth';
import { useAuth } from '@/stores/User/Auth';
import { storeToRefs } from 'pinia';
import { getCSRFTokenFromCookie } from './utilities';

const apiURL: string = window.APP_CONFIG.API_URL;

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const authStore = useAuth();
    const { token } = storeToRefs(authStore);
    //Attach the Bearer Token if it exist during api request
    if (token.value) {
      config.headers['Authorization'] = `Bearer ${token.value}`;
    }
    const csrfToken = getCSRFTokenFromCookie();
    if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuth();
      const csrfToken = getCSRFTokenFromCookie();
      if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
        originalRequest.headers['X-CSRFToken'] = csrfToken;
      }
      try {
        const response = await axios.post(apiURL + authAPI.refresh, null, {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        const token = response.data.data.access;
        authStore.token = token;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return await axios(originalRequest);
      } catch (e) {
        console.error('Token refresh failed', e);
        throw e;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
